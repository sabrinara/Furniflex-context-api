import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ProductProvider } from "./Context/ProductContext";
import router from "./routes/routes";
import AuthProvider from "./Context/AuthProvider";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        
          <RouterProvider router={router} />
     
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);