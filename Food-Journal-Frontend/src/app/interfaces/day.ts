import { IProductRequest } from "./product";

export interface IDay {
    id: Date,
    userId: string,
    productItems: IProductItem[];
}

export interface IProductItem {
    id: string,
    weight: number,
    product: IProductRequest,
    proteins: number,
    fats: number,
    carbohydrates: number,
    kcal: number   
}

export interface IProductItemRequest {
    // public DateTime Id { get; init; }
    // public Guid UserId { get; init; }
    // public List<ProductItem> ProductItems { get; set; }
    weight: number,
    productRequest: IProductRequest,
}