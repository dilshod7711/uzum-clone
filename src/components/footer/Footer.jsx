import React from "react";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebookF,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-700">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">
            Biz haqimizda
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-black transition cursor-pointer">
              Topshirish punktlari
            </li>
            <li className="hover:text-black transition cursor-pointer">
              Vakansiyalar
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">
            Foydalanuvchilarga
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-black transition cursor-pointer">
              Biz bilan bog‘lanish
            </li>
            <li className="hover:text-black transition cursor-pointer">
              Savol-Javob
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">
            Tadbirkorlarga
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-black transition cursor-pointer">
              Uzumda soting
            </li>
            <li className="hover:text-black transition cursor-pointer">
              Sotuvchi kabinetiga kirish
            </li>
            <li className="hover:text-black transition cursor-pointer">
              Topshirish punktini ochish
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">
            Ilovani yuklab olish
          </h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <FaApple size={22} className="text-black" />
              <span className="text-sm text-gray-700">AppStore</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FaGooglePlay size={22} className="text-green-500" />
              <span className="text-sm text-gray-700">Google Play</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-black">
            Uzum ijtimoiy tarmoqlarda
          </h3>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-pink-500 hover:scale-110 transition-transform"
            >
              <FaInstagram size={26} />
            </a>
            <a
              href="#"
              className="text-sky-500 hover:scale-110 transition-transform"
            >
              <FaTelegramPlane size={26} />
            </a>
            <a
              href="#"
              className="text-blue-600 hover:scale-110 transition-transform"
            >
              <FaFacebookF size={26} />
            </a>
            <a
              href="#"
              className="text-red-600 hover:scale-110 transition-transform"
            >
              <FaYoutube size={26} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-between text-sm text-gray-700">
          <div className="flex gap-4 font-semibold text-gray-800">
            <span className="cursor-pointer hover:underline">
              Maxfiylik kelishuvi
            </span>
            <span className="cursor-pointer hover:underline">
              Foydalanuvchi kelishuvi
            </span>
          </div>

          <p className="text-gray-500 mt-2 sm:mt-0">
            ©2025 XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar
            himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
