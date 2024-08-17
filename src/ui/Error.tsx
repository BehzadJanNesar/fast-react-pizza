import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  const errorMessage = (() => {
    if (error && typeof error === 'object' && 'message' in error) {
      return (error as { message: string }).message;
    } else if (error && typeof error === 'object' && 'data' in error) {
      return (error as { data: string }).data;
    }
    return 'Unknown error occurred';
  })();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
