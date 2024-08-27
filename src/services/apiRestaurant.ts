const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

interface MenuItem {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
  // Add other properties based on the API response
}

interface Order {
  id: number;
  items: {
    pizzaId: number;
    quantity: number;
  }[];
  totalPrice: number;
  // Add other properties based on the API response
}

interface NewOrder {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  // Add other properties necessary for creating an order
}

interface UpdateOrder {
  status?: string;
  // Add other properties that can be updated
}

export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data as MenuItem[];
}

export async function getOrder(id: number): Promise<Order> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data as Order;
}

export async function createOrder(newOrder: NewOrder): Promise<Order> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data as Order;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(
  id: number,
  updateObj: UpdateOrder,
): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
