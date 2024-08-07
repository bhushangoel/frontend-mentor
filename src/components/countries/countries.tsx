import React, { useContext, useEffect, useRef, useState } from "react";
import "./countries.css";
import { NavLink } from "react-router-dom";
import { themeContext } from "../../App";

const Countries = () => {
	const theme = useContext(themeContext);
	// http://localhost:3000/countries?_start=1&_end=10
	const BASE_URL = "http://localhost:8000/countries";
	const [countriesList, setCountriesList] = useState<any[]>([]);
	let existingCountriesListRef = useRef<any[]>([]);
	const [searchTerm, setSearchterm] = useState("");
	const [filterByRegion, setFilterByRegion] = useState("");

	const _fetchData = () => {
		fetch(`${BASE_URL}`)
			.then((res) => res.json())
			.then((countries) => {
				setCountriesList(countries);
				existingCountriesListRef.current = countries;
			});
	};

	useEffect(() => {
		_fetchData();
	}, []);

	useEffect(() => {
		if (searchTerm !== "" && searchTerm.length > 2) {
			const searchedCountry = countriesList.filter((country) => {
				const countryName = country.name.toLowerCase();
				return countryName.includes(searchTerm.toLowerCase());
			});
			setCountriesList(searchedCountry || []);
		} else if (searchTerm === "") {
			setSearchterm("");
			setFilterByRegion("");
			setCountriesList(existingCountriesListRef.current);
		}
	}, [searchTerm]);

	useEffect(() => {
		if (filterByRegion !== "") {
			const searchedCountry = countriesList.filter((country) => {
				const region = country.region.toLowerCase();
				return filterByRegion === region;
			});
			setCountriesList(searchedCountry || []);
		} else {
			setSearchterm("");
			setFilterByRegion("");
			setCountriesList(existingCountriesListRef.current);
		}
	}, [filterByRegion]);

	return (
		<div className={`${theme}`}>
			<h1>Countries ({countriesList.length} loaded)</h1>
			<div className="d-flex justify-space-between">
				<input
					type="text"
					className="w-80"
					placeholder="Enter 3 characters to search any country..."
					onChange={(e) => setSearchterm(e.target.value)}
				/>
				<select
					name="regionFilter"
					onChange={(e) => setFilterByRegion(e.target.value)}
					defaultValue="">
					<option value="">Filter by Region</option>
					<option value="asia">Asia</option>
					<option value="europe">Europe</option>
					<option value="africa">Africa</option>
					<option value="americas">America</option>
					<option value="oceania">Oceania</option>
				</select>
			</div>
			<br />
			<div className="countries flex">
				{countriesList.map((country) => {
					return (
						<NavLink
							data-testid="record"
							className="detail-link"
							to={`/countries/${country.name}?id=${country.id}`}
							key={country.name}>
							<div className="country-box">
								<img className="country-flag" src={country.flag} alt="" />
								<div className="country-name">{country.name}</div>
								<ul className="country-detail">
									<li>
										<b>Population:</b>
										{country.population}
									</li>
									<li>
										<b>Region:</b>
										{country.region}
									</li>
									<li>
										<b>Capital:</b>
										{country.capital}
									</li>
								</ul>
							</div>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default Countries;
