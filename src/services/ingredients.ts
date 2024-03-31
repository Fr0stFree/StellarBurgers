const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

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