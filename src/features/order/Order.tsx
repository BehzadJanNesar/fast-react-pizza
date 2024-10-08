// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

// Define a type for the cart items
type CartItem = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

// Define a type for the order object
type OrderType = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status?: string;
};
interface DataEl {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

function Order(): JSX.Element {
  const order = useLoaderData() as OrderType;
  console.log(order);

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );
  // Extracting data from the order object
  const {
    id,
    status = 'Processing',
    priority,
    priorityPrice,
    // orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const totalPriceInItem: number = cart
    .map((cart) => cart.totalPrice)
    .reduce((curr, item) => item + curr, 0);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item, index) => (
          <OrderItem
            item={item}
            key={index}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((el: DataEl) => el.id === item.pizzaId)
                .ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(totalPriceInItem)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(totalPriceInItem + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

interface OrderLoader {
  id: number;
  items: {
    pizzaId: number;
    quantity: number;
  }[];
  totalPrice: number;
}
interface OrderParamsType {
  params: {
    orderId: number;
  };
}

export async function loader({
  params,
}: OrderParamsType): Promise<OrderLoader> {
  const data = await getOrder(params.orderId);
  return data;
}

export default Order;
