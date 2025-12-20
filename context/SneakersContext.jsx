import useFetch from "../customHooks/useFetch";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useShoppingData from "../customHooks/useShoppingData";

const SneakersContext = createContext();

const useSneakersContext = () => useContext(SneakersContext);

export default useSneakersContext;

export function SneakersProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState({
    visible: false,
    message: "",
    title: "Notification",
    id: 0,
  });
  const {
    data: sneakersData,
    loading: sneakersLoading,
    error: sneakersError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers");
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
    fetchData: fetchCart,
  } = useShoppingData("https://kicks-culture-backend.vercel.app/sneakers/cart");
  const {
    data: wishlistData,
    loading: wishlistLoading,
    error: wishlistError,
    fetchData: fetchWishlist,
  } = useShoppingData(
    "https://kicks-culture-backend.vercel.app/sneakers/wishlist"
  );

  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setWishlist(wishlistData);
    }
  }, [wishlistData]);

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setCart(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const showToast = (message, title = "Notification") => {
    setToastMessage({ visible: true, message, title, id: Date.now() });
  };

  const hideToast = () => {
    setToastMessage((prev) => ({ ...prev, visible: false }));
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
        wishlist,
        setWishlist,
        wishlistError,
        wishlistLoading,
        fetchWishlist,
        cartData,
        cartLoading,
        cartError,
        toastMessage,
        setToastMessage,
        hideToast,
        showToast,
      }}
    >
      {children}
    </SneakersContext.Provider>
  );
}
