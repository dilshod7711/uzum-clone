import React, { useState } from "react";
import { ShoppingCart, List, User, Heart, Search } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import uzum from "../../assets/uzum-logo.png";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import useContextApp from "../../hooks/useContextApp";
const countries = [
  "Tashkent",
  "Andijan",
  "Bukhara",
  "Fergana",
  "Jizzakh",
  "Khorezm",
  "Namangan",
  "Navoi",
  "Qashqadaryo",
  "Samarkand",
  "Sirdaryo",
  "Surkhandaryo",
  "Tashkent Region",
  "Karakalpakstan",
];

const Header = () => {
  const [language, setLanguage] = useState("UZB");

  const { cart } = useContextApp();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <header className="">
      <div className="bg-gray-50 py-3 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex items-center gap-2 text-gray-700">
            <IoLocationOutline size={20} />
            <Select
              placeholder="Select a country…"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: "140px",
                border: "none",
                backgroundColor: "#f3f4f6",
                boxShadow: "none",
                borderRadius: "0.375rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              {countries.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
            <span className="text-sm font-medium">Delivery points</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <span className="text-purple-700 cursor-pointer transition">
              Becoming a seller
            </span>
            <span className="text-purple-700 cursor-pointer transition">
              Open a delivery point
            </span>
            <span className="hover:text-gray-900 cursor-pointer transition">
              Questions and answers
            </span>
            <span className="hover:text-gray-900 cursor-pointer transition">
              My orders
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none hover:border-gray-400 transition"
            >
              <option value="UZB">Uzbek</option>
              <option value="RUS">Russian</option>
            </select>
          </div>
        </div>
      </div>

      <nav className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={uzum} alt="Uzum Logo" className="h-10 w-auto" />
          </div>

          <button className="flex items-center gap-1 px-4 py-2 bg-purple-200 text-purple-700  rounded-lg transition cursor-pointer cursor-pointer">
            <List size={18} />
            Catalog
          </button>

          <div className="flex flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search for products and categories"
              className="flex-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-0"
            />

            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-sm -ml-2 transition cursor-pointer flex items-center justify-center w-[100px] cursor-pointer">
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2  rounded-lg hover:bg-purple-50 transition cursor-pointer">
              <User size={18} />
              Login
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg  hover:bg-purple-50 transition cursor-pointer">
              <Heart size={18} />
              Sorted
            </button>
            <button className="flex items-center gap-2">
              <ShoppingCart size={18} />
              Cart ({totalItems}) - {totalPrice.toLocaleString()} so'm
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
