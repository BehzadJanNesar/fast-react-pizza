import { useState, ChangeEvent, FormEvent } from "react";

// https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str: string): boolean =>
//    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

// Define a type for the cart items
// type CartItem = {
//    pizzaId: number;
//    name: string;
//    quantity: number;
//    unitPrice: number;
//    totalPrice: number;
// };

// const fakeCart: CartItem[] = [
//    {
//       pizzaId: 12,
//       name: "Mediterranean",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//    },
//    {
//       pizzaId: 6,
//       name: "Vegetale",
//       quantity: 1,
//       unitPrice: 13,
//       totalPrice: 13,
//    },
//    {
//       pizzaId: 11,
//       name: "Spinach and Mushroom",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//    },
// ];

function CreateOrder(): JSX.Element {
   const [withPriority, setWithPriority] = useState<boolean>(false);
   // const cart: CartItem[] = fakeCart;

   // Handle the form submission (if necessary)
   const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Add form submission logic here
   };

   // Handle changes to the checkbox
   const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      setWithPriority(event.target.checked);
   };

   return (
      <div>
         <h2>Ready to order? Let's go!</h2>

         <form onSubmit={handleFormSubmit}>
            <div>
               <label htmlFor="customer">First Name</label>
               <input type="text" name="customer" id="customer" required />
            </div>

            <div>
               <label htmlFor="phone">Phone number</label>
               <div>
                  <input type="tel" name="phone" id="phone" required />
               </div>
            </div>

            <div>
               <label htmlFor="address">Address</label>
               <div>
                  <input type="text" name="address" id="address" required />
               </div>
            </div>

            <div>
               <input
                  type="checkbox"
                  name="priority"
                  id="priority"
                  checked={withPriority}
                  onChange={handleCheckboxChange}
               />
               <label htmlFor="priority">Want to give your order priority?</label>
            </div>

            <div>
               <button type="submit">Order now</button>
            </div>
         </form>
      </div>
   );
}

export default CreateOrder;
