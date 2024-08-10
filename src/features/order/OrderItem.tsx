import { formatCurrency } from "../../utils/helpers";

// Define the type for the item prop
type CartItem = {
   quantity: number;
   name: string;
   totalPrice: number;
};

// Define the type for the component props
type OrderItemProps = {
   item: CartItem;
   isLoadingIngredients: boolean;
   ingredients: string[]; // Assuming ingredients is an array of strings
};

function OrderItem({ item }: OrderItemProps): JSX.Element {
   const { quantity, name, totalPrice } = item;

   return (
      <li>
         <div>
            <p>
               <span>{quantity}&times;</span> {name}
            </p>
            <p>{formatCurrency(totalPrice)}</p>
         </div>
      </li>
   );
}

export default OrderItem;
