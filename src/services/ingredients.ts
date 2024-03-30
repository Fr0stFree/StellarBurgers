const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export interface Ingredient {
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

export const loadIngredients: () => Promise<Ingredient[]> = async () => {

  const response = await fetch(INGREDIENTS_URL);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки ингредиентов: ${response.status}`);
  }
  const { data, success }: { data: Ingredient[], success: boolean } = await response.json();
  if (!success) {
    throw new Error(`Ошибка загрузки ингредиентов: ${data}`);
  }
  return data;
}