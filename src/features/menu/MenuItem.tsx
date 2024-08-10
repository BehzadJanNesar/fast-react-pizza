import { formatCurrency } from "../../utils/helpers";

// Define the type for the pizza prop
type Pizza = {
   id: number;
   name: string;
   unitPrice: number;
   ingredients: string[];
   soldOut: boolean;
   imageUrl: string;
};

type MenuItemProps = {
   pizza: Pizza;
};

// Define the MenuItem component with typed props
function MenuItem({ pizza }: MenuItemProps): JSX.Element {
   const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

   return (
      <li>
         <img src={imageUrl} alt={name} />
         <div>
            <p>{name}</p>
            <p>{ingredients.join(", ")}</p>
            <div>{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}</div>
         </div>
      </li>
   );
}

export default MenuItem;
