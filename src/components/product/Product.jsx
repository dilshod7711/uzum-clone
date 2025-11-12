import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useContextApp from "../../hooks/useContextApp";
import { Context } from "../../context";
import { ToastContainer, toast } from "react-toastify";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = ({ product }) => {
  const [cart, setCart] = useContextApp(Context);
  const navigate = useNavigate();

  const notify = (msg) =>
    toast.success(msg, { position: "bottom-right", autoClose: 1500 });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(product) {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      notify("Bu mahsulot allaqachon savatchada!");
      return;
    }

    const newCart = [...cart, { ...product, quantity: 1 }];
    setCart(newCart);
    notify("Mahsulot savatchaga qo‘shildi!");
  }

  function handleDetail(id) {
    navigate(`/${id}`);
  }

  const formatPrice = (price) => {
    return price ? price.toLocaleString("en-US").replace(/,/g, " ") : "";
  };

  const originalPrice = product.price || 50000;
  const discount = product.discountPercentage || 10;
  const currentPrice = originalPrice - (originalPrice * discount) / 100;
  const installmentPrice = Math.floor(currentPrice / 12) || 4500;

  const isLoading = !product.id;

  return (
    <SkeletonTheme baseColor="#EFEFEF" highlightColor="#F7F7F7">
      <div className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {isLoading ? (
          <div className="p-3 flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center p-2 mb-3">
              <Skeleton height={180} />
            </div>

            <Skeleton width={80} height={10} className="mb-1" />

            <Skeleton count={2} height={14} className="mb-2" />

            <Skeleton width={120} height={12} className="mb-4" />

            <div className="mt-auto">
              <Skeleton width={130} height={20} className="mb-1" />

              <Skeleton width={70} height={10} className="mb-0.5" />

              <Skeleton width={100} height={24} className="mb-3" />
            </div>

            <Skeleton height={40} />
          </div>
        ) : (
          <>
            <div
              className="relative w-full h-48 flex items-center justify-center p-2 cursor-pointer"
              onClick={() => handleDetail(product.id)}
            >
              <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors z-10">
                <Heart size={18} fill="none" strokeWidth={2} />
              </button>

              <img
                src={
                  product.images?.[0] ||
                  product.thumbnail ||
                  "https://via.placeholder.com/200?text=Uzum"
                }
                alt={product.title}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />

              {discount > 0 && (
                <div className="absolute bottom-0 left-0 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-br-lg rounded-tl-lg">
                  -{discount}%
                </div>
              )}
            </div>

            <div className="flex flex-col p-3 pt-1 flex-grow">
              <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                {product.brand || "Uzum brendi"}
              </p>

              <h3
                className="text-sm font-normal text-gray-800 mb-2 h-10 cursor-pointer hover:text-purple-600 transition-colors line-clamp-2"
                onClick={() => handleDetail(product.id)}
              >
                {product.title ||
                  product.description ||
                  "Mahsulot nomini yozish uchun joy. 400ml"}
              </h3>

              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Star
                  size={14}
                  fill="#facc15"
                  stroke="#facc15"
                  className="mr-1"
                />
                <span className="text-gray-900 font-semibold">
                  {product.rating ? product.rating.toFixed(1) : "4.5"}
                </span>
                <span className="mx-1">•</span>
                <span className="text-gray-500">
                  ({product.stock || 120} buyurtma)
                </span>
              </div>

              <div className="mt-auto">
                <div className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded w-max mb-1">
                  {formatPrice(installmentPrice)} so‘m x 12 oy
                </div>
                {discount > 0 && (
                  <p className="text-xs text-gray-500 line-through mb-0.5">
                    {formatPrice(originalPrice)} so'm
                  </p>
                )}
                <p className="text-lg font-bold text-gray-900 mb-3">
                  {formatPrice(currentPrice)} so'm
                </p>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>Savatchaga</span>
              </button>
            </div>
            <ToastContainer />
          </>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default Product;
