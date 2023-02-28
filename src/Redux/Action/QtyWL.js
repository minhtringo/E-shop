export const AddWL = (product) => {
    return {
        type: "ADD_WL",
        payload: product
    }
}

export const DecrementWl = (product) => {
    return {
        type: "DECREMENT_WL",
        payload: product
    }
}