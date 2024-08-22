import { useSelector } from 'react-redux';
import { getCurrentQtyById } from '../../services/Selectors/Selectors';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQty from './UpdateItemQty';

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
  const { name, pizzaId, quantity, totalPrice } = item;
  const currentQty = useSelector(getCurrentQtyById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQty pizzaId={pizzaId} currentQty={currentQty} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
