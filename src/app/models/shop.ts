export interface IShop {
    id?: string;
    nameProduct: string;
    price: number;
    fileUpload?: string;
}

export interface ICart {
    id?: string;
    nameProduct: string;
    quantity: number;
    totalPrice: number;
    fileUpload?: string;
}
export interface IPrepareCart {
    id?: string;
    nameProduct?: string;
    price?: number;
    quantity?: number;
    fileUpload?: string;
}
