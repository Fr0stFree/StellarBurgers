import {type IOrder} from "./types.ts";
import {type IIngredient} from "../ingredients/types.ts";
import {IngredientType} from "../ingredients/const.ts";

export const extractOrderIngredients = (order: IOrder, allIngredients: IIngredient[]): IIngredient[] => {
  return order.ingredients
    .map(ingredientId => allIngredients.find(ingredient => ingredient._id === ingredientId))
    .filter(ingredient => ingredient !== undefined)
    .map(ingredient => ingredient!.type === IngredientType.BUN ? [ingredient, ingredient] : ingredient)
    .flat() as IIngredient[];
}

export const mergeOrders = (oldOrders: IOrder[], newOrders: IOrder[]): IOrder[] => {
  const oldOrdersMap = new Map(oldOrders.map(order => [order._id, order]));
  const newOrdersMap = new Map(newOrders.map(order => [order._id, order]));
  const mergedOrders = new Map([...oldOrdersMap, ...newOrdersMap]);
  return Array.from(mergedOrders.values()).sort((first, second) => (
    new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  ));
}

export const localizeOrderTimeSince = (date: IOrder['updatedAt']): string => {
  const updatedAt = new Date(date);
  const daysPassed = (Date.now() - updatedAt.getTime()) / 1000 / 60 / 60 / 24;
  const localDatetime = updatedAt.toLocaleTimeString('ru-RU', {hour: 'numeric', minute: 'numeric'})
  if (daysPassed < 1) {
    return `Сегодня, ${localDatetime}`;
  }
  if (daysPassed < 2) {
    return `Вчера, ${localDatetime}`;
  }
  if (daysPassed < 5) {
    return `${daysPassed} дня назад, ${localDatetime}`;
  }
  return `${daysPassed} дней назад, ${localDatetime}`;
}

export const localizeOrderStatus = (status: IOrder['status']): string => {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    case "canceled":
      return "Отменён";
    default:
      return "Неизвестный статус";
  }
}

export const orderStatusExtraClassMap: Record<IOrder['status'], string> = {
  created: "text_color_primary",
  pending: "text_color_primary",
  done: "text_color_success",
  canceled: "text_color_inactive",
}
