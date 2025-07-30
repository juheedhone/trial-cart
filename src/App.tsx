import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

interface Item {
  id: number;
  title: string;
}

function App() {
  const [products, setProducts] = useState<Item[]>([]);
  console.log(products);

  useEffect(() => {
    axios
      .get<{ products: Item[] }>("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  return <ul>cart</ul>;
}

export default App;
