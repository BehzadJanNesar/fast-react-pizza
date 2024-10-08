import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:border-none focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        type="text"
        value={query}
        placeholder="search order"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
