import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { selectCartOverview } from '../../services/Selectors/Selectors';

function CartOverview() {
  const { totalItemPrice, totalItemQty } = useSelector(selectCartOverview);

  if (!totalItemPrice) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalItemQty} pizzas</span>
        <span>{formatCurrency(totalItemPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
