import { formatCurrency } from '../../utils/helpers';

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
  ingredients: string[];
};

function OrderItem({
  item,
  ingredients,
  isLoadingIngredients,
}: OrderItemProps): JSX.Element {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm italic text-stone-500">
        {isLoadingIngredients ? 'loading...' : ingredients.join(' , ')}
      </p>
    </li>
  );
}

export default OrderItem;
