import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import contentReducer from "./content/reducer";
import CategoryListReducer from "./category/reducer";
import SubCategoryListReducer from "./subcategory/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  CategoryLists: CategoryListReducer,
  SubCategoryLists: SubCategoryListReducer,
  content: contentReducer
});

export default rootReducer;
