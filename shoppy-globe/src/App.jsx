import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "./Redux/store";
import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/productlist";
import RegistrationForm from "./User/RegistratioForm";
import LoginForm from "./User/LoginForm";


export default function App() {
  return (
    <Provider store={store}>

        <Header />
             {  <Outlet />  } 
    </Provider>
  );
}
