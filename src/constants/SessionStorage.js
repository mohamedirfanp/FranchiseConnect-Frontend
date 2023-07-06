const Wishlist = "wishlist"


export const getWishlist = () => {
    return sessionStorage.getItem(Wishlist);
}

export const setWishlistStorage = (wishlist) => {
    sessionStorage.setItem(Wishlist, wishlist);
}


export const ClearAll = () => {
    sessionStorage.clear();
}