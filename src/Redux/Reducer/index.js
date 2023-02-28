import { combineReducers } from "redux"
import QtyCart from "./QtyCart"
import QtyWL from "./QtyWL"

const rootReducer = combineReducers({
    QtyCart: QtyCart,
    QtyWL: QtyWL
})

export default rootReducer