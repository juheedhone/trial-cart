export interface ICart {
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  quantity: number;
}
