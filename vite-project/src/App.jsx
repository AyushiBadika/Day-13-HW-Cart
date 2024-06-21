import { useEffect, useState } from "react";

export default function App() {
  const [allProducts, setAllProducts] = useState([
    {
      id: 0,
      name: "Product-1",
      price: 100,
      cartCount: 0,
    },
    {
      id: 1,
      name: "Product-2",
      price: 200,
      cartCount: 0,
    },
    {
      id: 2,
      name: "Product-3",
      price: 300,
      cartCount: 0,
    },
  ]);

  const [cartItem, setCartItem] = useState([]);
  let total = 0;

  useEffect(() => {
    setCartItem(allProducts.filter((prod) => prod.cartCount > 0));
  }, [allProducts]);

  cartItem.forEach((item) => (total += item.cartCount * item.price));

  const increment = (index) => {
    setAllProducts((prev) => {
      return prev.map((itemObj, i) =>
        i === index ? { ...itemObj, cartCount: itemObj.cartCount + 1 } : itemObj
      );
    });
  };

  const decrement = (index) => {
    setAllProducts((prev) => {
      return prev.map((itemObj, i) =>
        i === index
          ? {
              ...itemObj,
              cartCount: itemObj.cartCount > 0 ? itemObj.cartCount - 1 : 0,
            }
          : itemObj
      );
    });
  };
  return (
    <div className="h-[100vh] flex justify-center items-center   ">
      <div className=" border-4 p-8 rounded-md flex gap-12 justify-center items-center">
        <div className="border-r-2 pr-8">
          <h1 className="mb-4">Products</h1>
          <div>
            {allProducts.map((product, index) => {
              return (
                <div key={product.id} className="flex gap-8">
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <div className="flex gap-2">
                    <p
                      className="cursor-pointer"
                      onClick={() => increment(index)}
                    >
                      +
                    </p>
                    <p className="w-4 flex justify-center items-center">
                      {product.cartCount}
                    </p>
                    <p
                      onClick={() => decrement(index)}
                      className="cursor-pointer"
                    >
                      -
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h1 className="mb-4">Cart</h1>
          {cartItem.map((item) => {
            return (
              <div key={item.id} className="flex gap-8 border-b-2">
                <p>{item.name}</p>
                <div className="flex gap-2">
                  <p className="w-4 flex justify-center items-center">
                    {item.cartCount}
                  </p>
                  <p>×</p>
                  <p>{item.price}</p>
                </div>
              </div>
            );
          })}
          <div className="flex gap-8">
            <p>Total</p>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
