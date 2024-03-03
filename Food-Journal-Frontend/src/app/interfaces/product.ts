export interface IProduct {
    id: string,
    name: string,
    proteins: number,
    fats: number,
    carbohydrates: number,
    kcal: number   
}

export interface IProductRequest {
    name: string,
    proteins: number,
    fats: number,
    carbohydrates: number,
    // kcal: number   
}

export interface IAddProduct {
    name: string,
    proteins: number,
    fats: number,
    carbohydrates: number,
}