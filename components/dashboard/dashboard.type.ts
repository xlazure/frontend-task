export type productType = {
    quantity: number;
    id: string; 
    data: {
        title: string;
        animal: string;
        category: string;
        image: string;
        price: number;
        currency: string;
    };
}


export type configType = {
    query: string;
    focus: boolean;
    isMinView: boolean;
    filter: {
        animal: string;
        category: string;
    };
}

export type coreDataType = {
    products: productType[];
    id?: string;
    pending: boolean;
}