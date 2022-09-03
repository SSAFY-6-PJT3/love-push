import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import reducers from "./reducers/rootReducer"
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const store = createStore(reducers, composeWithDevTools());
// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화

export default store;