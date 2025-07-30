import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";
import { addItem, removeItem } from "./redux/slice/cartSlice";

interface Item {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

function App() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    dispatch(addItem(product.id));
  };

  const handleRemoveFromCart = (product: Item) => {
    dispatch(removeItem(product.id));
  };

  return (
    <div className="app">
      <Header />
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
