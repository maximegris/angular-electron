class Item {
  _id: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  class: string;
  category: string;
  selected: boolean;
  orderQty: number;
  scancode: string;

  constructor() {
    (this.name = ''),
      (this.description = ''),
      (this.unit = ''),
      (this.price = null),
      (this.class = ''),
      (this.category = ''),
      (this.selected = false),
      (this.orderQty = 1);
  }
}

export default Item;
