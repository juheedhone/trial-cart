import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";

interface Item {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios
      .get<{ products: Item[] }>("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddToCart = (product: Item) => {
    setCartCount((prev) => prev + 1);
    // You can add more cart logic here, like storing items in state or localStorage
    console.log("Added to cart:", product);
  };

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main className="main-content">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
}

export default App;
