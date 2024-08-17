import { Link } from 'react-router-dom';

interface ButtonProps {
  children: string;
  disabled?: boolean;
  to?: string;
}

function Button({ children, disabled, to }: ButtonProps) {
  const className =
    'inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;
