import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
   const navigate = useNavigate();
   const error = useRouteError();

   const errorMessage = (() => {
      if (error && typeof error === "object" && "message" in error) {
         return (error as { message: string }).message;
      } else if (error && typeof error === "object" && "data" in error) {
         return (error as { data: string }).data;
      }
      return "Unknown error occurred";
   })();

   return (
      <div>
         <h1>Something went wrong 😢</h1>
         <p>{errorMessage}</p>
         <button onClick={() => navigate(-1)}>&larr; Go back</button>
      </div>
   );
}

export default Error;
