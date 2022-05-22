export interface IUser {
    $uid?: string;
    email: string;
    password: string;
    displayName?: string;
    photoURL?: string;
    role?: string;
    shippingAddress?: IShippingAddress;
}

export interface IShippingAddress {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    address: string;
    province: string;
    zipCode: number;
}

