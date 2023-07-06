import React, {createContext, useState, useEffect} from 'react';


import { useDebounce } from 'primereact/hooks';
        

import {getWishlist, setWishlistStorage} from '../constants/SessionStorage';

import {AddWishlist,GetWishlist,RemoveWishlist} from '../api/Franchisee/FranchiseApi';
import { set } from 'react-hook-form';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist data from local storage on initial render
    useEffect(() => {
        const storedWishlist = getWishlist();
        if (storedWishlist) {
            setWishlist(storedWishlist);
        }
		else
		{
			GetWishlist()
			.then((response) => {
				const userWishlist = response.data.userWishlistResponse;
				if(userWishlist.length)
				{
					const franchiseIds = userWishlist.map((franchise) => franchise.franchise.franchiseId);
					setWishlist(franchiseIds)
				}
			})
			.catch((error) => {
				console.error(error);
			})
		}
    }, []);

    // Update local storage whenever wishlist changes
    useEffect(() => {
		setWishlistStorage(wishlist);
	}, [wishlist]);



    const addToWishlist = (franchiseId) => {
		console.log(franchiseId);
        setWishlist((prevWishlist) => [
            ...prevWishlist,
            franchiseId
        ]);
		AddWishlist(franchiseId)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.error(error);	
		} )
		
    };

    const removeFromWishlist = (franchiseId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== franchiseId));
    };

    const isAddedToWishlist = (franchiseId) => {
        return wishlist.includes(franchiseId);
    };

    return (<WishlistContext.Provider value={
        {wishlist, addToWishlist, removeFromWishlist, isAddedToWishlist}
    }> {children} </WishlistContext.Provider>);
};
