import { useState, FormEvent, ChangeEvent } from "react";

function CreateUser(): JSX.Element {
   const [username, setUsername] = useState<string>("");

   function handleSubmit(e: FormEvent): void {
      e.preventDefault();
      // Additional logic for submitting the form can be added here
   }

   return (
      <form onSubmit={handleSubmit}>
         <p>👋 Welcome! Please start by telling us your name:</p>

         <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
         />

         {username !== "" && (
            <div>
               <button type="submit">Start ordering</button>
            </div>
         )}
      </form>
   );
}

export default CreateUser;
