import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown';
import { getAllCountries, getCityDetails, getCountryDetails } from './services/countries.service';

const App = () => {
	const [countries, setCountries] = useState(null);
	const [cities, setCities] = useState(null);
	const [area, setArea] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');


	const getSelectedCountryId = selectedCountry => {
		setSelectedCountry(selectedCountry);
		if(selectedCity) setSelectedCity(null);
		getCountryDetails(selectedCountry.id).then(res => setCities([...res.data.data]));
	}

	const getSelectedCityId = selectedCity => {
		setSelectedCity(selectedCity);
		getCityDetails(selectedCountry.id, selectedCity.id).then(res => setArea([...res.data.data]));
	}

	useEffect(()=> {
		if(!countries) {
			getAllCountries()
			.then(res => {
				setCountries([...res.data.data]);
				setLoad(true);
			}).catch(err => {
				setLoad(false);
				setError(err.message);
			});
		}
	}, [countries, cities, selectedCountry, selectedCity, load, error])

	return (
		<div className="wrapper">
			<h2>Country</h2>
			{load && <Dropdown items={countries} details={getSelectedCountryId} />}
			
			{ (selectedCountry && cities) &&
				<>
					<h2>City</h2>
					<Dropdown items={cities} details={getSelectedCityId} />
				</>
			}
			
			{ (area && selectedCountry?.attributes?.iso2Code == 'EG') &&
				<>
					<h2>Area</h2>
					<Dropdown items={area} />
				</>
			}
        </div>
	);
}

export default App;
