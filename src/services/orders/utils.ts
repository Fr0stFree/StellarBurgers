import {IOrder} from "./types.ts";
import {IIngredient} from "../ingredients/types.ts";

export const extractOrderIngredients = (order: IOrder, allIngredients: IIngredient[]): IIngredient[] => {
  return order.ingredients
    .map(ingredientId => allIngredients.find(ingredient => ingredient._id === ingredientId))
    .filter(ingredient => ingredient !== undefined) as IIngredient[];
}

export const mergeOrders = (oldOrders: IOrder[], newOrders: IOrder[]): IOrder[] => {
  const oldOrdersMap = new Map(oldOrders.map(order => [order._id, order]));
  const newOrdersMap = new Map(newOrders.map(order => [order._id, order]));
  const mergedOrders = new Map([...oldOrdersMap, ...newOrdersMap]);
  return Array.from(mergedOrders.values()).sort((first, second) => (
    new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  ));
}

export const localizeOrderTimeSince = (order: IOrder): string => {
  const date = new Date(order.createdAt);
  const daysPassed = (Date.now() - date.getTime()) / 1000 / 60 / 60 / 24;
  const localDatetime = date.toLocaleTimeString('ru-RU', {hour: 'numeric', minute: 'numeric'})
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

export const localizeOrderStatus = (order: IOrder): string => {
  switch (order.status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return "Неизвестный статус";
  }
}
