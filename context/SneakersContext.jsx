import useFetch from "../customHooks/useFetch";
import { createContext, useContext, useState } from "react";

const SneakersContext = createContext();

const useSneakersContext = () => useContext(SneakersContext);

export default useSneakersContext;

export function SneakersProvider({ children }) {
  const [cart, setCart] = useState([]);
  const {
    data: sneakersData,
    loading: sneakersLoading,
    error: sneakersError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers");
  const {
    data: wishlistData,
    loading: wishlistLoading,
    error: wishlistError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/wishlist");
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/cart");

  return (
    <SneakersContext.Provider
      value={{
        sneakersData,
        sneakersLoading,
        sneakersError,
        cart,
        setCart,
        wishlistData,
        wishlistError,
        wishlistLoading,
        cartData,
        cartLoading,
        cartError,
      }}
    >
      {children}
    </SneakersContext.Provider>
  );
}
