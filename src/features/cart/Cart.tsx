import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartOverview } from '../../services/Selectors/Selectors';
import { clearCart } from './CartSlice';
import EmptyCart from './EmptyCart';

// Define a type for the cart items
// type CartItem = {
//   pizzaId: number;
//   name: string;
//   quantity: number;
//   unitPrice: number;
//   totalPrice: number;
// };

// Define the Cart component
function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const { cartItems, username } = useSelector(selectCartOverview);

  function handleDeleteFunction() {
    dispatch(clearCart());
  }

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cartItems.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={handleDeleteFunction} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
