import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();
const getWishlistKey = () => {
  const userId = localStorage.getItem("userId");
  return userId ? `wishlist_${userId}` : "wishlist_guest";
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem(getWishlistKey());
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    } else {
      setWishlist([]);
    }
  }, []);


  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(
      getWishlistKey(),
      JSON.stringify(wishlist)
    );
  }, [wishlist]);


  // ✅ ADD TO WISHLIST
 const addToWishlist = (item) => {
    if (!wishlist.some(w => w.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };


  // ✅ REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  // ✅ THIS IS THE MISSING FUNCTION (MAIN FIX)
  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist, // 👈 VERY IMPORTANT
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
