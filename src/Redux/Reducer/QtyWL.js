const product = JSON.parse(localStorage.getItem('productWishlist'))
const initialState = Object.keys(product).length

const QtyWL = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WL': {
            return action.payload

        }

        case 'DECREMENT_WL': {
            return action.payload
        }

        default:
            return state
    }
}

export default QtyWL