import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { Context } from "./context";
import { useState } from "react";
import Detail from "./pages/cart/detail/Detail";

const App = () => {
  const [cart, setcart] = useState([]);
  return (
    <Context.Provider value={[cart, setcart]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
};

export default App;
