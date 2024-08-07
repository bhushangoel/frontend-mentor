import { useEffect, useRef, createContext, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./App.css";

export const themeContext = createContext<string | undefined>(undefined);

export default function Root() {
	const [theme, setTheme] = useState("light");

	const loc = useLocation();
	const { pathname } = loc;
	const tempNode = useRef(null);

	const handleScroll = (e: any) => {
		console.log("handle scroll called : ", e.target);
		const { scrollTop, scrollHeight, clientHeight } = e.target;
		const position = Math.ceil(
			(scrollTop / (scrollHeight - clientHeight)) * 100
		);
		console.log("position : ", position, loc);

		if (pathname === "/countries") {
			window.localStorage.setItem("listPagePos", position.toString());
		}
	};

	useEffect(() => {
		if (pathname === "/countries" && tempNode?.current) {
			const listPagePos: number = parseInt(
				window.localStorage.getItem("listPagePos") || "1"
			);
			console.log("listPagePos : ", listPagePos, tempNode);
			// tempNode.current.scrollIntoView();
		}
	});

	return (
		<div className="d-flex w-100" ref={tempNode} onScrollCapture={handleScroll}>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
						/>
						<div id="search-spinner" aria-hidden hidden={true} />
						<div className="sr-only" aria-live="polite"></div>
					</form>
					<form method="post">
						<button type="submit">New</button>
					</form>
				</div>
				<nav>
					<ul>
						<li>
							<NavLink to={`/about`}>About</NavLink>
						</li>
						<li>
							<NavLink to={`/todo`}>TODO</NavLink>
						</li>
						<li>
							<NavLink to={`/countries`}>Countries</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<themeContext.Provider value={theme}>
				<div id="detail" className={`${theme}`}>
					<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle theme</button>
					<Outlet />
				</div>
			</themeContext.Provider>
		</div>
	);
}
