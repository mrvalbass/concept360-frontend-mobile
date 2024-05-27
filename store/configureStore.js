// store/configureStore.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers"; // Importez votre rootReducer ici

const store = configureStore({
  reducer: rootReducer,
  // Autres options de configuration éventuelles
});

export default store;
