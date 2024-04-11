import { type IIngredient, type IOrder } from './types';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export const loadIngredients: () => Promise<IIngredient[]> = async () => {
  const response = await fetch(INGREDIENTS_URL);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки ингредиентов: ${response.status}`);
  }
  const { data, success }: { data: IIngredient[], success: boolean } = await response.json();
  if (!success) {
    throw new Error(`Ошибка загрузки ингредиентов: ${data}`);
  }
  return data;
}

export const sendOrder: (ingredientIds: string[]) => Promise<IOrder> = async (ingredientIds) => {
  const response = await fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
  if (!response.ok) {
    throw new Error(`Ошибка отправки заказа: ${response.status}`);
  }
  const { success, ...rest } = await response.json();
  if (!success) {
    throw new Error('Ошибка отправки заказа');
  }
  return rest;
}