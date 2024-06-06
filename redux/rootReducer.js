import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import categoryReducer from "./sidebarList/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer
});

export default rootReducer;
