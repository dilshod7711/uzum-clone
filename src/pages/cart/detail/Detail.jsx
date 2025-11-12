import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API } from "../../../helpers/API/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import { Heart, ShoppingCart, Truck, Shield, Share2, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="w-5 h-5 fill-yellow-400" />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            );
          }
          return <Star key={i} className="w-5 h-5 text-gray-300" />;
        })}
    </div>
  );
};

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        alert(err.message || "Error fetching product");
      });
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < (data?.stock || 99)) {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    alert("Xarid sahifasiga o'tilmoqda...");
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const discountedPrice =
    data.price - (data.price * (data.discountPercentage || 0)) / 100;

  return (
    <div className="min-h-screen">
      <div className="bg-white ">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <NavLink to="/" className="hover:text-purple-600 cursor-pointer">
              Bosh sahifa
            </NavLink>
            <span>/</span>
            <span className="hover:text-purple-600 cursor-pointer">
              {data.category || "Mahsulotlar"}
            </span>
            <span>/</span>
            <span className="text-gray-900">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className=" rounded-2xl  overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Thumbs, Navigation, Pagination]}
                  className="h-[500px]"
                >
                  {data.images?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={`${data.title} - ${idx + 1}`}
                        className="w-full h-full object-contain p-4"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button className="bg-white p-2.5 rounded-full shadow-md hover:shadow-lg transition">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`bg-white p-2.5 rounded-full shadow-md hover:shadow-lg transition ${
                      isFavorite ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`}
                    />
                  </button>
                </div>

                {data.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-md">
                    -{data.discountPercentage}%
                  </div>
                )}
              </div>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                modules={[Thumbs]}
                className="h-20"
              >
                {data.images?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-cover cursor-pointer border-2 border-gray-200 rounded-lg hover:border-purple-500 transition"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-sm text-purple-600 font-semibold mb-2">
                  {data.brand || "ORIGINAL"}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {data.title}
                </h1>
              </div>

              <div className="flex items-center gap-4 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <StarRating rating={data.rating || 4.5} />
                  <span className="text-gray-900 font-semibold">
                    {data.rating || 4.5}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({data.reviews?.length || 0} sharh)
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">
                  {Math.floor(Math.random() * 1000) + 100}+ buyurtma
                </span>
              </div>

              <div className="py-6 border-b">
                <div className="flex items-end gap-3 mb-3">
                  <div className="text-4xl font-bold text-purple-600">
                    {Math.round(discountedPrice).toLocaleString()} so'm
                  </div>
                  {data.discountPercentage > 0 && (
                    <div className="text-xl text-gray-400 line-through mb-1">
                      {data.price.toLocaleString()} so'm
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Oyiga {Math.round(discountedPrice / 12).toLocaleString()}{" "}
                  so'mdan (12 oy)
                </p>
              </div>

              <div className="py-6 border-b">
                <p className="text-gray-700 font-medium mb-3">Miqdor:</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange("decrement")}
                      className="px-5 py-3 text-xl font-bold hover:bg-gray-100 transition text-gray-700"
                    >
                      −
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold min-w-[60px] text-center border-x-2 border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increment")}
                      className="px-5 py-3 text-xl font-bold hover:bg-gray-100 transition text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  {data.stock && (
                    <span className="text-sm text-gray-600">
                      Omborda:{" "}
                      <span className="font-semibold text-green-600">
                        {data.stock} dona
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <div className="py-6 space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Hoziroq xarid qilish
                </button>
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">
                    Bepul yetkazib berish 100 000 so'mdan
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Kafolat va qaytarish huquqi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="py-8">
                {activeTab === "overview" && (
                  <div className="prose max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Mahsulot haqida
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
