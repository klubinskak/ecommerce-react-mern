import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ProductContext } from "./context/ProductContext";
import { BagIndexContext } from "./context/BagIndex";
import { useState } from "react";
import ShoppingCard from "./pages/ShoppingCard";
import Products from "./pages/Product";
import ProductList from "./pages/ProductList";
import SearchPage from './pages/SearchPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [bagIndex, setBagIndex] = useState(0);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <ProductContext.Provider value={{ products, setProducts }}>
            <BagIndexContext.Provider value={{bagIndex, setBagIndex}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/card" element={<ShoppingCard />} />
              <Route path="/products/:productId" element={<Products />} />
              <Route path="/productslist" element={<ProductList />} />
              <Route path="/search/:query" element={<SearchPage/>}/>
            </Routes>
            </BagIndexContext.Provider>
          </ProductContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
