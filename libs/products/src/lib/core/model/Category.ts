export interface Category {
    id?: number,
    name?: string,
    icon?: string,
    color?: string,
}
export interface CategoryResponse {
    success: boolean,
    category: Category,
    message: string,
}