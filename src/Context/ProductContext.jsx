import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios
            .get("/products.json")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);


    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};
