const product = JSON.parse(localStorage.getItem('products'))
const initialState = Object.keys(product).length

const QtyCart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_Cart': {
            return action.payload
        }

        case 'DECREMENT_Cart': {
            return action.payload
        }

        default:
            return state
    }
}

export default QtyCart