import { Heart, Star, ShoppingCart } from "lucide-react";
import { useProducts } from "../../hooks/useProduct";
import useContextApp from "../../hooks/useContextApp";

const Home = () => {
  const { data, isLoading, setEror } = useProducts();
  const { cart, setCart } = useContextApp();

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 text-lg py-20">...Loading</p>
    );
  }

  if (setEror) {
    return (
      <p className="text-center text-red-700 text-lg py-20">
        Malumotlarni olishda xatolik
      </p>
    );
  }

  function handleAddToCart(product) {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handlePlus(product) {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function handleMinus(product) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">Famous</h1>

        {!data || data.length === 0 ? (
          <h1 className="text-gray-500 text-center text-xl">
            Ma'lumot mavjud emas
          </h1>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {data.map((product) => {
              const inCart = cart.find((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  <div className="relative w-full h-48 flex justify-center items-center bg-gray-50 border-b border-gray-100">
                    <img
                      src={product.images?.[0] || product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition ">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="p-3 flex-1 flex flex-col">
                    <div className="text-base font-bold text-gray-900 mb-3">
                      {Math.round(product.price).toLocaleString()} so'm
                    </div>
                    <p className="text-xs text-gray-400 mb-1 truncate">
                      {product.brand || "Brand"}
                    </p>
                    <h3 className="text-sm text-gray-500 font-medium mb-2 line-clamp-2 h-9">
                      {product.description}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Star
                          size={14}
                          className="fill-orange-400 text-orange-400"
                        />
                        <span className="ml-1">{product.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span>({product.stock} reviews)</span>
                    </div>

                    {!inCart ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        <span className="cursor-pointer">Savatchaga</span>
                      </button>
                    ) : (
                      <div className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleMinus(product)}
                          className="px-2 bg-white text-purple-700 rounded"
                        >
                          -
                        </button>

                        <span>{inCart.quantity} </span>

                        <button
                          onClick={() => handlePlus(product)}
                          className="px-2 bg-white text-purple-700 rounded"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
