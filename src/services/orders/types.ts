export interface IPreOrder {
  readonly name: string;
  readonly order: {
    readonly number: number;
  };
}

export interface IOrder {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: 'done' | 'pending' | 'created' | 'canceled';
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}

export interface IOrderWithOwner extends IOrder {
  readonly owner: string;
}
