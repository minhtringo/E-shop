import { createContext } from "react"
import { useState } from 'react'

export const ProductContext = createContext()

export const ProductProvide = ({ children }) => {
    const [QtyProducts, setQtyProduct] = useState('')
    const [QtyProductsWL, setQtyProductWL] = useState('')

    function QtyCart(data) {
        setQtyProduct(data);
        localStorage.setItem('qtyProducts', JSON.stringify(data));
    }

    function QtyWL(data) {
        setQtyProductWL(data);
        localStorage.setItem('qtyProductsWL', JSON.stringify(data));
    }

    return (
        <ProductContext.Provider value={{
            QtyCart: QtyCart,
            QtyProducts: QtyProducts,
            QtyWL: QtyWL,
            QtyProductsWL: QtyProductsWL
        }} >
            {children}
        </ProductContext.Provider>
    )
}