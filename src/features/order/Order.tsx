// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from "../../utils/helpers";

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
   status?: string; // Assuming status is optional as it's not included in the sample order object
};

function Order(): JSX.Element {
   const order = useLoaderData() as OrderType;
   // Extracting data from the order object
   const {
      // id,
      status = "Processing",
      priority,
      priorityPrice,
      orderPrice,
      estimatedDelivery,
      // cart,
   } = order;

   const deliveryIn = calcMinutesLeft(estimatedDelivery);

   return (
      <div>
         <div>
            <h2>Status</h2>

            <div>
               {priority && <span>Priority</span>}
               <span>{status} order</span>
            </div>
         </div>

         <div>
            <p>
               {deliveryIn >= 0
                  ? `Only ${deliveryIn} minutes left 😃`
                  : "Order should have arrived"}
            </p>
            <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
         </div>

         <div>
            <p>Price pizza: {formatCurrency(orderPrice)}</p>
            {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
            <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
         </div>
      </div>
   );
}

export async function loader({ params }) {
   const data = await getOrder(params.orderId);
   return data;
}

export default Order;
