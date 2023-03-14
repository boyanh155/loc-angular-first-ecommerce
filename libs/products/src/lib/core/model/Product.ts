import { Category } from "./Category";

export interface Product {
    id?: number,
    name?: string,
    image?: string,
    images?: Array<string>,
    brand?: string,
    description?:string,
    richDescription?:string,
    price?: number,
    countInStock?: number,
    rating?: number,
    numViews?: number,
    isFeatured?: boolean,
    category?: Category,
    dateCreated?: string,
}
export interface ProductResponse {
    success: boolean,
    product: Product,
    message: string,
}