import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem } from '../cart/CartSlice';

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
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  function handleDispatch() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: 32 * unitPrice,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="mt-0.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut ? (
            <Button onClick={handleDispatch} type="small">
              add to cart
            </Button>
          ) : (
            <p className="cursor-default rounded-lg bg-stone-200 p-1 text-sm font-medium italic text-red-700">
              doesn't exist!
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
