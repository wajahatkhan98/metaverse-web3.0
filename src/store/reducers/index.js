import { combineReducers } from "redux";

// import nftReducer from "./nfts";
// import hotCollectionsReducer from "./hotCollections";
// import authorListReducer from "./authorList";
// import filterReducer from "./filters";
// import blogPostsReducer from "./blogs";
import userReducer from "./UserReducer";

export const rootReducer = combineReducers({
  // NFT: nftReducer,
  user: userReducer,
  // hotCollection: hotCollectionsReducer,
  // authors: authorListReducer,
  // filters: filterReducer,
  // blogs: blogPostsReducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;
