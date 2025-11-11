import React, { useState, useEffect } from "react";
import useContextApp from "../../hooks/useContextApp";
import { Context } from "../../context";
import { useTranslation } from "react-i18next";

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
      <div className="container mx-auto py-24 text-center text-3xl font-semibold text-gray-500">
        {t("header.cart")}
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Savat</h1>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-full sm:w-48 h-48 object-cover sm:object-contain bg-gray-100"
              />

              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                  <p className="text-lg font-bold text-purple-600">
                    {item.price.toLocaleString()} so‘m
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMinus(item.id)}
                      className="w-9 h-9 flex items-center justify-center bg-gray-200 text-lg font-bold rounded-lg hover:bg-gray-300 transition"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 bg-gray-100 rounded-lg text-gray-800 font-medium">
                      {counts[item.id] || 1}
                    </span>
                    <button
                      onClick={() => handlePlus(item.id)}
                      className="w-9 h-9 flex items-center justify-center bg-purple-600 text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    O‘chirish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit sticky top-20">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Buyurtma</h2>
          <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-700 text-sm"
              >
                <span>
                  {item.title.slice(0, 20)}{" "}
                  {counts[item.id] ? `x${counts[item.id]}` : ""}
                </span>
                <span>
                  {(item.price * (counts[item.id] || 1)).toLocaleString()} so‘m
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Jami:</span>
            <span className="text-purple-600">
              {total.toLocaleString()} so‘m
            </span>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition">
            Xaridni yakunlash
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
