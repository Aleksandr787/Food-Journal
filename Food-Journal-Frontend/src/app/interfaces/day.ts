import { IProductRequest } from "./product";

export interface IDay {
    // public DateTime Id { get; init; }
    // public Guid UserId { get; init; }
    // public List<ProductItem> ProductItems { get; set; }
    id: Date,
    userId: string,
    productItems: IProductItem[];
}

export interface IProductItem {
    // public DateTime Id { get; init; }
    // public Guid UserId { get; init; }
    // public List<ProductItem> ProductItems { get; set; }
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