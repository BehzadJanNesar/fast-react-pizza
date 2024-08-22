import { useSelector } from 'react-redux';
import { selectCartOverview } from '../../services/Selectors/Selectors';

function UserName() {
  const { username } = useSelector(selectCartOverview);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold sm:block">{username}</div>
  );
}

export default UserName;
