import { useState, ChangeEvent } from 'react';
import {
  Form,
  redirect,
  useNavigation,
  ActionFunctionArgs,
  useActionData,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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

const fakeCart: CartItem[] = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder(): JSX.Element {
  const username = useSelector((state: RootState) => state.user.username);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const cart: CartItem[] = fakeCart;
  const formErrors = useActionData() as FormErrors;

  // Handle changes to the checkbox
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWithPriority(event.target.checked);
  };

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
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              id="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={handleCheckboxChange}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order....' : 'Order now'}
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

  const order: OrderData = {
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors: Errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please provide a correct phone number; we might need it to contact you.';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
