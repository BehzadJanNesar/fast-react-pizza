import { formatCurrency } from "../../utils/helpers";

// Define the type for the item prop
type CartItemProps = {
   item: {
      pizzaId: number;
      name: string;
      quantity: number;
      totalPrice: number;
   };
};

// Define the CartItem component with typed props
function CartItem({ item }: CartItemProps): JSX.Element {
   const { name, quantity, totalPrice } = item;

   return (
      <li>
         <p>
            {quantity}&times; {name}
         </p>
         <div>
            <p>{formatCurrency(totalPrice)}</p>
         </div>
      </li>
   );
}

export default CartItem;
