import { useContext, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { CartContext } from "../../Context/CartContext";
import usePagination from "../../Hooks/usePagination";
import Sidebar from "../../Pages/Shared/Sidebar";


const Store = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState(null); 
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const itemsPerPage = 6;
  const { currentData, nextPage, prevPage, currentPage, maxPage } = usePagination(filteredProducts, itemsPerPage);

  return (
    <div className="flex">
     <div className="w-1/6">
     <Sidebar onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
     </div>

     <div className="w-5/6">
     <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {currentData().map((product) => (
            <div key={product.id} className="bg-slate-100 flex flex-col justify-center items-centers gap-6 m-4 rounded">
              <div className="h-[236px]">
                <img src={product.image} alt={product.name} className="w-full h-[236px]" />
              </div>
              <div className="px-8 pt-4">
                <h3 className="text-xl text-black font-bold">{product.name}</h3>
                <div className="flex justify-between mt-2">
                  <p className="text-lg text-black font-bold ">{product.price}</p>
                  <p className="line-through text-lg">{product.previousPrice}</p>
                  <p className="text-lg text-red-600 font-bold">{product.offer}</p>
                </div>
                <p className="text-sm">{product.description.slice(0, 77)}</p>
              </div>
              <button onClick={() => addToCart(product)} className="bg-black text-white py-3 mx-7 mb-6 rounded">Add to Cart</button>
            </div>
          ))}
        </div>

        
        <div className="flex justify-center my-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`mx-2 px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
          >
            Previous
          </button>
          <span className="mx-4">Page {currentPage} of {maxPage}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === maxPage}
            className={`mx-2 px-4 py-2 bg-gray-300 rounded ${currentPage === maxPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
          >
            Next
          </button>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Store;
