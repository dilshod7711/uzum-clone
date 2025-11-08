import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import { useState } from "react";
import { Context } from "./context";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Context.Provider value={{ cart, setCart }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
};

export default App;
