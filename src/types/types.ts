import {Location} from 'history';

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
}

export type TOwner = { email?: string; name?: string; password?: string, token?: string };
export type TOrderStatus = 'done' | 'pending' | 'created'
export type TOrder = {
    ingredients: Array<string>;
    number: number;
    _id: string;
    owner: TOwner;
    status: TOrderStatus;
    name: string;
    createdAt: Date;
    price: number;
}

export interface IAppLocation extends Location {
    from: string;
    state: {
        background?: string
    }
}

export type TImage = {
    url: string,
    id: string
}