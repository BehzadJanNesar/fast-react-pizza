// Test ID: IIDSAT

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

const order: OrderType = {
   id: "ABCDEF",
   customer: "Jonas",
   phone: "123456789",
   address: "Arroios, Lisbon , Portugal",
   priority: true,
   estimatedDelivery: "2027-04-25T10:00:00",
   cart: [
      {
         pizzaId: 7,
         name: "Napoli",
         quantity: 3,
         unitPrice: 16,
         totalPrice: 48,
      },
      {
         pizzaId: 5,
         name: "Diavola",
         quantity: 2,
         unitPrice: 16,
         totalPrice: 32,
      },
      {
         pizzaId: 3,
         name: "Romana",
         quantity: 1,
         unitPrice: 15,
         totalPrice: 15,
      },
   ],
   position: "-9.000,38.000",
   orderPrice: 95,
   priorityPrice: 19,
};

function Order(): JSX.Element {
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

export default Order;
