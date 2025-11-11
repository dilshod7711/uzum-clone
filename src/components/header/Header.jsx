import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ShoppingCart, List, User, Heart, Search } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import uzum from "../../assets/uzum-logo.png";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, useNavigate } from "react-router-dom";
import { changeLanguage } from "i18next";
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
  const { t, i18n } = useTranslation();

  const [cart, setCart] = useContextApp();

  useEffect(() => {
    const current = localStorage.getItem("lang");
    i18n.changeLanguage(current);
  }, [i18n]);
  function handleLanguage(e) {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  }

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/");
  }
  return (
    <header className="">
      <div className="bg-gray-50 py-3 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex items-center gap-2 text-gray-700">
            <IoLocationOutline size={20} />
            <Select
              placeholder={t("header.select")}
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
            <span className="text-sm font-medium">{t("header.delevery")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <span className="text-purple-700 cursor-pointer transition">
              {t("header.become")}
            </span>
            <span className="text-purple-700 cursor-pointer transition">
              {t("header.open")}
            </span>
            <span className="hover:text-gray-900 cursor-pointer transition">
              {t("header.answer")}
            </span>
            <span className="hover:text-gray-900 cursor-pointer transition">
              {t("header.order")}
            </span>
            <select
              value={i18n.language}
              onChange={handleLanguage}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none hover:border-gray-400 transition"
            >
              <option value="uz">Uzbek</option>
              <option value="ru">Russian</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <nav className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              onClick={handleNavigate}
              src={uzum}
              alt="Uzum Logo"
              className="h-10 w-auto cursor-pointer"
            />
          </div>

          <button className="flex items-center gap-1 px-4 py-2 bg-purple-200 text-purple-700  rounded-lg transition cursor-pointer cursor-pointer">
            <List size={18} />
            {t("header.catalog")}
          </button>

          <div className="flex flex-1 max-w-xl">
            <input
              type="text"
              placeholder={t("header.search")}
              className="flex-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-0"
            />

            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-sm -ml-2 transition cursor-pointer flex items-center justify-center w-[100px] cursor-pointer">
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <NavLink className="flex text-black items-center gap-2 px-4 py-2  rounded-lg  cursor-pointer">
              <User size={18} />
              {t("header.login")}
            </NavLink>
            <NavLink className="flex items-center gap-2 px-4 py-2 rounded-lg  cursor-pointer">
              <Heart size={18} />
              {t("header.sorted")}
            </NavLink>
            <NavLink
              to="/cart"
              className=" flex items-center gap-1 justify-center "
            >
              <ShoppingCart size={18} />
              <span className="font-medium">{t("header.cart")}</span>

              <span className=" bg-purple-700  text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm">
                {cart.length}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
