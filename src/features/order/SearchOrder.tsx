import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
   const [query, setQuery] = useState("");
   const navigate = useNavigate();
   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      navigate(`/order/${query}`);
      setQuery("");
   }
   return (
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            value={query}
            placeholder="search order"
            onChange={(e) => setQuery(e.target.value)}
         />
      </form>
   );
}

export default SearchOrder;
