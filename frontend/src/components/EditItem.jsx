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
