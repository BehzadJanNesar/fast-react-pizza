import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './CartSlice';

interface DeleteItemProps {
  pizzaId: number;
}

function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;
