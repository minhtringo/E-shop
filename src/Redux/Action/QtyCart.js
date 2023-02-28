export const AddCart = (product) => {
    return {
        type: "ADD_Cart",
        payload: product
    }
}

export const DecrementCart = (product) => {
    return {
        type: "DECREMENT_Cart",
        payload: product
    }
}