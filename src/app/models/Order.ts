export interface Order {
  id: number,
  order_id: number,
  image_id: number,
  user_id: number,
  start_date: string,
  end_date: string,
  name: string,
  thumb_img_path: string,
  file: string,
  sku_number: string,
  position?: number,
  show?: boolean
}
