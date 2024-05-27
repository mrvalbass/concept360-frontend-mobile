// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Importez votre authReducer ici

const rootReducer = combineReducers({
  auth: authReducer,
  // Autres reducers si nécessaire
});

export default rootReducer;
