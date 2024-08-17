import { useState, ChangeEvent } from 'react';
import {
  Form,
  redirect,
  useNavigation,
  ActionFunctionArgs,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const cart: CartItem[] = fakeCart;

  // Handle changes to the checkbox
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWithPriority(event.target.checked);
  };

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label htmlFor="customer">First Name</label>
          <input
            className="input"
            type="text"
            name="customer"
            id="customer"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone number</label>
          <div>
            <input
              className="input"
              type="tel"
              name="phone"
              id="phone"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <div>
            <input
              className="input"
              type="text"
              name="address"
              id="address"
              required
            />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
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
