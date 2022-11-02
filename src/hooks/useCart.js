import { useState, useEffect } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getStoredCart();
    const storedCart = [];
    const keys = Object.keys(savedCart);
    fetch('http://localhost:5000/productbykeys', {
        method: 'POST', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(keys)
    })
    .then(res => res.json())
    .then(products => {
        for (const key in savedCart) {
      const addedProduct = products.find((product) => product.key === key);
      if (addedProduct) {
        // set quantity
        const quantity = savedCart[key];
        addedProduct.quantity = quantity;
        storedCart.push(addedProduct);
      }
    }
    setCart(storedCart);
    })
    
  }, []);

  return [cart, setCart];
};

export default useCart;
