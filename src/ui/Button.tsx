import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: keyof StylesType; // restricts type to 'primary' or 'small'
}

interface StylesType {
  primary: string;
  small: string;
  secondary: string;
  round: string;
}

function Button({ children, disabled, to, type, onClick }: ButtonProps) {
  const base: string =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles: StylesType = {
    primary: base + ' px-3 py-2.5 md:px-5 md:py-3.5',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
