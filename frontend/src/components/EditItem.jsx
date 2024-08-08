<<<<<<< HEAD
import './EditItem.css';


export const EditItem = ({}) => {
  return (
    <div>EditItem</div>
  )
}
=======
import { useState } from "react";

export const EditItem = () => {
  const [quantity, setQuantity] = useState(0);
  return (
    <form>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </form>
  );
};
>>>>>>> dd049b075808b82d3c4d44f6a6f3fa771f4bda2b
