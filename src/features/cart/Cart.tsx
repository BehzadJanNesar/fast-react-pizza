import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';

// Define a type for the cart items
// type CartItem = {
//    pizzaId: number;
//    name: string;
//    quantity: number;
//    unitPrice: number;
//    totalPrice: number;
// };

// // Create the cart array using the defined type
// const fakeCart: CartItem[] = [
//    {
//       pizzaId: 12,
//       name: "Mediterranean",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//    },
//    {
//       pizzaId: 6,
//       name: "Vegetale",
//       quantity: 1,
//       unitPrice: 13,
//       totalPrice: 13,
//    },
//    {
//       pizzaId: 11,
//       name: "Spinach and Mushroom",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//    },
// ];

// Define the Cart component
function Cart(): JSX.Element {
  // cart is of type CartItem[]
  // const cart: CartItem[] = fakeCart;

  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2>Your cart, %NAME%</h2>

      <div>
        <Button to="/order/new">Order pizzas</Button>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
