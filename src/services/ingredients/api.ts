import { IIngredient } from './types';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

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