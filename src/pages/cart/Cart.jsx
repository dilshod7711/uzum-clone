import React, { useState, useEffect } from "react";
import useContextApp from "../../hooks/useContextApp";
import { Context } from "../../context";
import { useTranslation } from "react-i18next";
import { Heart, Trash2, Truck } from "lucide-react";
const Cart = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useContextApp(Context);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handlePlus = (id) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleMinus = (id) => {
    const currentCount = counts[id] || 1;
    if (currentCount > 1) {
      setCounts((prev) => ({ ...prev, [id]: currentCount - 1 }));
    } else {
      removeItem(id);
    }
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (counts[item.id] || 1),
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto py-24 text-center text-3xl font-bold text-gray-500">
        Savatda hozircha mahsulot yo‘q
      </div>
    );
  }

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Savat ({cart.length} mahsulot)
          </h1>

          {cart.map((item) => {
            const quantity = counts[item.id] || 1;
            const itemTotal = item.price * quantity;
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row bg-white shadow-sm rounded-xl overflow-hidden p-4 border border-gray-100"
              >
                <div className="w-full sm:w-36 h-36 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={
                      item.images?.[0] ||
                      item.thumbnail ||
                      "https://via.placeholder.com/150?text=Product"
                    }
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between p-0 pt-4 sm:p-0 sm:pl-4">
                  <div className="flex justify-between w-full">
                    <div>
                      <h2 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2 hover:text-purple-600 cursor-pointer">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Sotuvchi: **{item.brand || "Uzum Market"}**
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-col items-end flex-shrink-0 ml-4">
                      <p className="text-xl font-bold text-gray-900">
                        {itemTotal.toLocaleString()} so‘m
                      </p>
                      <div className="flex items-center text-xs text-green-600 mt-1">
                        <Truck size={14} className="mr-1" />
                        <span className="font-medium">Ertaga yetkazish</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-4 border-t border-gray-300 pt-3 w-full">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMinus(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-lg font-bold rounded-lg hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-gray-800 font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handlePlus(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-4 items-center">
                      <button
                        className="text-gray-500 hover:text-red-500 transition flex items-center gap-1 text-sm font-medium"
                        title="Sevimlilarga qo'shish"
                      >
                        <Heart size={20} />
                        <span className="hidden sm:inline">Sevimlilar</span>
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition flex items-center gap-1 text-sm font-medium"
                        title="O‘chirish"
                      >
                        <Trash2 size={20} />
                        <span className="hidden sm:inline">O‘chirish</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-4 h-fit sticky top-6">
          <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Buyurtma</h2>

            <div className="space-y-3 pb-4 mb-4">
              <div className="flex justify-between text-gray-700 text-base">
                <span>Mahsulotlar ({cart.length} dona)</span>
                <span>{total.toLocaleString()} so‘m</span>
              </div>

              <div className="flex justify-between text-green-600 text-base">
                <span>Chegirma</span>
                <span>0 so‘m</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold mb-4 border-t pt-4">
              <span>Jami:</span>
              <span className="text-gray-900">
                {total.toLocaleString()} so‘m
              </span>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg">
              Xaridni rasmiylashtirish
            </button>

            <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-center">
              <p className="font-semibold text-purple-700">
                Uzum karta bilan 10% gacha keshbek oling!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
