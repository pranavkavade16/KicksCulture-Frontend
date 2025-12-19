import useFetch from "../customHooks/useFetch";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const SneakersContext = createContext();

const useSneakersContext = () => useContext(SneakersContext);

export default useSneakersContext;

export function SneakersProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistError, setWishlistError] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: "", id: 0 });
  const {
    data: sneakersData,
    loading: sneakersLoading,
    error: sneakersError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers");
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/cart");
  const fetchWishlist = useCallback(async () => {
    setWishlistLoading(true);
    try {
      const res = await fetch(
        "https://kicks-culture-backend.vercel.app/sneakers/wishlist"
      );
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      setWishlistData(data);
    } catch (error) {
      setWishlistError(error.message);
    } finally {
      setWishlistLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchWishlist();
  }, []);
  const showToast = (message) => {
    setToastMessage({
      message: message,
      id: Date.now(),
    });

    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  return (
    <SneakersContext.Provider
      value={{
        sneakersData,
        sneakersLoading,
        sneakersError,
        cart,
        setCart,
        address,
        setAddress,
        wishlistData,
        setWishlistData,
        wishlistError,
        wishlistLoading,
        fetchWishlist,
        cartData,
        cartLoading,
        cartError,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </SneakersContext.Provider>
  );
}
