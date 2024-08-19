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
  // isLoadingIngredients: boolean;
  // ingredients: string[]; // Assuming ingredients is an array of strings
};

function OrderItem({ item }: OrderItemProps): JSX.Element {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
