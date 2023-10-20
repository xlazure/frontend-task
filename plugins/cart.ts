type CartItem = {
    quantity: number;
    id: string; // Add the 'id' property
    data: {
        title: string;
        animal: string;
        category: string;
        image: string;
        price: number;
        currency: string;
    };
}

type CartState = {
    items: CartItem[];
}

type CartAction = 'add' | 'odd';

export default defineNuxtPlugin(() => {

    const store = ref<CartState>({
        items: [],
    });

    const addToCart = (item: CartItem) => {
        const existingItem = store.value.items.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            store.value.items.push(item);
        }
    };

    const removeFromCart = (item: CartItem) => {
        const index = store.value.items.findIndex((cartItem) => cartItem.id === item.id);
        if (index !== -1) {
            store.value.items.splice(index, 1);
        }
    };

    const changeQuantityValue = (item: CartItem, operation: CartAction) => {
        const currentItem = store.value.items.find((cartItem) => cartItem.id === item.id);

        if (!currentItem) return;

        if (currentItem.quantity <= 1 && operation === 'odd') {
            removeFromCart(currentItem)
        }
        if (currentItem.quantity >= 0 && operation === 'add') {
            currentItem.quantity += 1;
        }
        if (currentItem.quantity > 0 && operation === 'odd') {
            currentItem.quantity -= 1;
        }
    }

    const clearCart = () => {
        store.value.items = [];
    };

    return {
        provide: {
            cart:{ store, addToCart, removeFromCart, clearCart, changeQuantityValue}
        }
    }
})