import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user"],
};

const Reducer = persistReducer(persistConfig, AuthSlice);

const store = configureStore({
	reducer: {
		Auth: Reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these actions
			},
		}),
});

export default store;
export const persostor = persistStore(store);
