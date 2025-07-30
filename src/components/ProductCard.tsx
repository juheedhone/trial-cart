import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/slice/cartSlice";
import type { RootState } from "../redux/store";
import "./ProductCard.css";

interface Item {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

interface ProductCardProps {
  product: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const items = useSelector((state: RootState) => state.cartSlice.items);
  const itemExistsInCart = items.some((item) => item.id === product.id);

  const dispatch = useDispatch();

  const handleAddToCart = (product: Item) => {
    dispatch(addItem(product.id));
  };

  const handleRemoveFromCart = (product: Item) => {
    dispatch(removeItem(product.id));
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">${product.price}</div>
        {itemExistsInCart ? (
          <div className="item-in-cart">
            <button
              type="button"
              className="remove-item-btn"
              onClick={() => handleRemoveFromCart(product)}
            >
              <MinusIcon />
            </button>
            <button
              type="button"
              className="add-item-btn"
              onClick={() => handleAddToCart(product)}
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
            type="button"
          >
            <svg
              className="cart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Add to cart</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18"
              />
            </svg>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
