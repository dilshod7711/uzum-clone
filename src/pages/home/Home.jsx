import { useProducts } from "../../hooks/useProduct";
import Product from "../../components/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const { data, isLoading, setEror } = useProducts();

  if (isLoading)
    return (
      <p className="text-center text-gray-500 text-lg py-20">...Loading</p>
    );

  if (setEror)
    return (
      <p className="text-center text-red-700 text-lg py-20">
        Ma’lumotlarni olishda xatolik
      </p>
    );

  const swaperImages = [
    "https://images.uzum.uz/d49fp16j76ohd6e13550/main_page_banner.jpg",
    "https://images.uzum.uz/d45hncmj76ohd6dvuffg/main_page_banner.jpg",
    "https://images.uzum.uz/d466105v2sjo4rvgpbr0/main_page_banner.jpg",
    "https://images.uzum.uz/d492vkdsp2tr82i3nfpg/main_page_banner.jpg",
    "https://images.uzum.uz/d44pd2ej76ohd6dvmteg/main_page_banner.jpg",
    "https://images.uzum.uz/d44p8alv2sjo4rvgbss0/main_page_banner.jpg",
    "https://images.uzum.uz/d48smm5sp2tr82i3kj1g/main_page_banner.jpg",
    "https://images.uzum.uz/d2tdb9niub35i07jlgng/main_page_banner.jpg",
    "https://images.uzum.uz/d4933qej76ohd6e10qo0/main_page_banner.jpg",
    "	https://images.uzum.uz/d44s5fej76ohd6dvo440/main_page_banner.jpg",
    "https://images.uzum.uz/d18fmngn274lpu39pnp0/main_page_banner.jpg",
    "https://images.uzum.uz/d44tp2mj76ohd6dvot9g/main_page_banner.jpg",
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {swaperImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`banner-${index}`}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">
          Famous Products
        </h1>

        {!data || data.length === 0 ? (
          <h1 className="text-gray-500 text-center text-xl">
            Ma'lumot mavjud emas
          </h1>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {data.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
