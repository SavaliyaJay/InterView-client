import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import categoryReducer from "./sidebarList/reducer";
import contentReducer from "./content/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  content: contentReducer
});

export default rootReducer;
