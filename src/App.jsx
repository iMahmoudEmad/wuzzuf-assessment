import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown';
import { getAllCountries, getCountryDetails } from './services/countries.service';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState('');
	const [selectedCountry, setSelectedCountry] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');


	const getSelectedCountryId = selectedCountry => {
		setSelectedCountry(selectedCountry.id);
		getCountryDetails(selectedCountry.id).then(res => setCities([...res.data.data]));
	}

	const getSelectedCityId = selectedCountry => {
		setSelectedCity(selectedCountry.id);
		// getCountryDetails(selectedCountry.id).then(res => setCities([...res.data.data]));
	}

	useEffect(()=> {
		getAllCountries()
			.then(res => {
				setCountries([...res.data.data]);
				setLoad(true);
			}).catch(err => {
				setLoad(false);
				setError(err.message);
			});
		
	}, [])

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
        </div>
	);
}

export default App;
