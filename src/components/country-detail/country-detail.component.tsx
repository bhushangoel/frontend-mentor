import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./country-detail.component.css";

const CountryDetail = () => {
	const BASE_URL = "http://localhost:8000/countries";
	const country = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const countryId = searchParams.get("id");
	const [countryDetail, setCountryDetail] = useState<any>(null);

	useEffect(() => {
		fetch(`${BASE_URL}/${countryId}`)
			.then((res) => res.json())
			.then((country) => {
				console.log("country : ", country);
				setCountryDetail(country);
			});
	}, [countryId]);
	return (
		<>
			{countryDetail && (
				<>
					<div className="d-flex detail-container">
						<div className="flag">
							<img className="country-detail-flag" src={countryDetail.flag} alt="" />
						</div>
						<div className="detail d-flex">
                            <h3>{countryDetail?.name}</h3>
                            <ul className="detail-list">
                                <li><b>Native Name: </b>{countryDetail.nativeName}</li>
                                <li><b>Population: </b>{countryDetail.population}</li>
                                <li><b>Region: </b>{countryDetail.region}</li>
                                <li><b>Sub region: </b>{countryDetail.subregion}</li>
                                <li><b>Capital: </b>{countryDetail.capital}</li>
                                <li><b>Top level domain: </b>{countryDetail.topLevelDomain[0]}</li>
                                <li><b>Currencies: </b>{countryDetail.currencies[0]['name']}</li>
                                <li><b>Language: </b>{countryDetail.languages[0]['name']}</li>
                            </ul>
                        </div>
					</div>
				</>
			)}
		</>
	);
};

export default CountryDetail;
