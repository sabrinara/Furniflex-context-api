import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ProductProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";
import router from "./routes/routes";
import AuthProvider from "./Context/AuthProvider";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);