import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Todo from "./components/todo/todo";
import Notfound from "./pages/404";
import Countries from "./components/countries/countries";
import CountryDetail from "./components/country-detail/country-detail.component";
import { About } from "./components/about/about";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Notfound />,
		children: [
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/todo",
				element: <Todo />,
			},
			{
				path: "/countries",
				element: <Countries />,
			},
			{
				path: "/countries/:country",
				element: <CountryDetail />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
