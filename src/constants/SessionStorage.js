const Wishlist = "wishlist"


export const getWishlist = () => {
    return sessionStorage.getItem(Wishlist);
}

export const setWishlistStorage = (wishlist) => {
    sessionStorage.setItem(Wishlist, wishlist);
}
export const removeWishlist = (wishlistId) => {
    const currentWishlist = sessionStorage.getItem(Wishlist);
    if (currentWishlist) {
      const updatedWishlist = currentWishlist
        .split(",")
        .filter((id) => id !== wishlistId)
        .join(",");
      sessionStorage.setItem(Wishlist, updatedWishlist);
    }
  };


export const ClearAll = () => {
    sessionStorage.clear();
}