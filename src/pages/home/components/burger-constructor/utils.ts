import {ISelectedIngredient} from "../../../../services/ingredients/types.ts";
import {IngredientType} from "../../../../services/ingredients/const.ts";


export const isIngredientsOrderCorrect = (items: ISelectedIngredient[]): [boolean, ISelectedIngredient[]] => {
  const buns = items.filter(ingredient => ingredient.type === IngredientType.BUN);
  if (!buns.length) {
    return [true, items]
  }
  if (items[0].type === IngredientType.BUN && items[items.length - 1].type === IngredientType.BUN) {
    return [true, items]
  }
  return [false, [buns[0], ...items.filter(ingredient => ingredient.type !== IngredientType.BUN), buns[1]]];
};
