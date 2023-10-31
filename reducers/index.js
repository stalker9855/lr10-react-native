import { combineReducers, createStore } from "redux";
import cryptoReducer from "./CryptoReducer.js";
import amountReducer from "./AmountReducer.js";
const rootReducer = combineReducers({
  cryptoReducer: cryptoReducer,
  amountReducer: amountReducer,
});
const store = createStore(rootReducer);
export default store;
