import React, { createContext, useState } from 'react';
import { products } from '../asset/asset';

// Create the context
export const ShopContext = createContext();

function ShopContextProvider({ children }) {
    // Define shared states and constants
    const currency = "$";
    const delivery_fee = 10;

    const [search, setSearch] = useState(""); // Search query state
    const [showSearch, setShowSearch] = useState(false); // Controls visibility of the search bar

    // Values provided by the context
    const value = {
        delivery_fee,
        products,
        currency,
        search,
        setSearch,
        showSearch,
        setShowSearch,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
