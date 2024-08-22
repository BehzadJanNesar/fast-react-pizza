import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { useMemo } from 'react';

interface MenuDataTypes {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

function Menu() {
  const menuData = useLoaderData() as MenuDataTypes[];
  const memo = useMemo(
    () => menuData.map((pizza) => <MenuItem pizza={pizza} key={pizza.id} />),
    [menuData.length],
  );
  return <ul className="divide-y divide-stone-300 px-2">{memo}</ul>;
}

export async function loader(): Promise<MenuDataTypes[]> {
  return await getMenu();
}

export default Menu;
