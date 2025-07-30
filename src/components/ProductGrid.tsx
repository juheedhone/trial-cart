import type React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

interface Item {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

interface ProductGridProps {
  products: Item[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-content">
          <svg
            className="no-products-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>No products found</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your search to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
