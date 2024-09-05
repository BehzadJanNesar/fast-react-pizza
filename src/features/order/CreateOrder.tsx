import { useState } from 'react';
import {
  Form,
  // redirect,
  useNavigation,
  ActionFunctionArgs,
  useActionData,
  redirect,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartOverview } from '../../services/Selectors/Selectors';
import EmptyCart from '../cart/EmptyCart';
import store, { AppDispatch, RootState } from '../../store';
import { clearCart } from '../cart/CartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// Regular expression to validate phone numbers
const isValidPhone = (str: string): boolean =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// Define a type for the cart items
type CartItem = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

// Define a type for the order data
type OrderData = {
  customer: string;
  phone: string;
  address: string;
  cart: CartItem[];
  priority: boolean;
};

// Define a type for the error object
type Errors = {
  phone?: string;
};

interface FormErrors {
  phone?: string;
}

function CreateOrder(): JSX.Element {
  const { username, cartItems, totalItemPrice } =
    useSelector(selectCartOverview);
  const {
    address,
    status: addressStatus,
    position,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const formErrors = useActionData() as FormErrors;
  const priorityPrice = withPriority ? totalItemPrice * 0.2 : 0;
  const totalPrice = totalItemPrice + priorityPrice;

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="customer">
            First Name
          </label>
          <input
            className="input grow"
            defaultValue={username}
            type="text"
            name="customer"
            id="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="phone">
            Phone number
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              id="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="address">
            Address
          </label>
          <div className="relative grow">
            <input
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full"
              type="text"
              name="address"
              id="address"
              required
            />
            {!position?.latitude && !position?.longitude && (
              <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  {isLoadingAddress ? 'loading...' : 'Get Position'}
                </Button>
              </span>
            )}
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={() => setWithPriority(!withPriority)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cartItems)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.latitude && position?.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as Record<
    string,
    string
  >;
  console.log(data);

  const order: OrderData = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors: Errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please provide a correct phone number; we might need it to contact you.';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
