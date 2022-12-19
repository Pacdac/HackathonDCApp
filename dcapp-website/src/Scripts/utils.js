import { tokenListJSON } from "../Data/tokenList";      
import axios from "axios";
//Export the function to get a token from tokenListJSON by address
export function getTokenFromAddress(address) {
    return tokenListJSON.find(token => token.address.toLowerCase() === address.toLowerCase());
}

export async function getTokenPriceInEUR(symbol) {
    const response = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}EUR`);
    if (response.data.price === undefined) {
        console.log("Price not found");
        return 0;
    }
    return response.data.price;
}


