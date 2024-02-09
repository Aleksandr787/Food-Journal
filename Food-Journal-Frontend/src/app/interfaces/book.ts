export interface IBookImage {
    id: string,
    name: string,
    author: string,
    imageUrl: string,
}

export interface IAddBookImage {
    name: string,
    author: string,
    imageUrl: string,
}

export interface IEditBookImage {
    id: string,
    name: string,
    author: string,
    imageUrl: string,
}

export interface IAuthor {
    firstname: string,
    lastname: string
}