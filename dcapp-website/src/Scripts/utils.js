import { tokenListJSON } from "../Data/tokenList";      
import axios from "axios";
//Export the function to get a token from tokenListJSON by address
export function getTokenFromAddress(address) {
    return tokenListJSON.find(token => token.address === address);
}

export async function getTokenPriceInEUR(symbol) {
    const response = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}EUR`);
    return response.data.price;
}

