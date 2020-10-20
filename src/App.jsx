import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown';
import {
	getAllCountries,
	getCityDetails,
	getCountryDetails,
} from './services/countries.service';

const App = () => {
	const [countries, setCountries] = useState();
	const [cities, setCities] = useState();
	const [area, setArea] = useState();
	const [selectedCountry, setSelectedCountry] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');

	const getSelectedCountryId = (selectedCountry) => {
		setSelectedCountry(selectedCountry);
		if (selectedCity) setSelectedCity(null);
		getCountryDetails(selectedCountry.id).then((res) =>
			setCities([...res.data.data])
		);
	};

	const getSelectedCityId = (selectedCity) => {
		setSelectedCity(selectedCity);
		if (checkIfCountryIsEgypt)
			getCityDetails(selectedCountry.id, selectedCity.id).then((res) =>
				setArea([...res.data.data])
			);
	};

	const checkIfCountryHasPreviousValue = (prevCountryValue) => {
		setError('Please select city');
		setSelectedCity('');
		return prevCountryValue;
	};

	const checkIfCountryIsEgypt = selectedCountry?.attributes?.iso2Code === 'EG';

	useEffect(() => {
		if (!countries) {
			getAllCountries()
				.then((res) => {
					setCountries([...res.data.data]);
					setLoad(true);
				})
				.catch((err) => {
					setLoad(false);
					setError(err.message);
				});
		}
	}, [countries, cities, selectedCountry, selectedCity, load, error]);

	return (
		<div className='wrapper'>
			{load && (
				<>
					<h2>Country</h2>
					<Dropdown
						items={countries}
						details={getSelectedCountryId}
						prevValue={checkIfCountryHasPreviousValue}
					/>
				</>
			)}

			{selectedCountry && cities && (
				<>
					<h2>City</h2>
					<Dropdown
						items={cities}
						details={getSelectedCityId}
						inputValue={
							checkIfCountryHasPreviousValue && error && !selectedCity
						}
					/>
					{checkIfCountryHasPreviousValue && error && !selectedCity && (
						<p className='error'>{error}</p>
					)}
				</>
			)}

			{selectedCity && area && checkIfCountryIsEgypt && (
				<>
					<h2>Area</h2>
					<Dropdown items={area} />
				</>
			)}
		</div>
	);
};

export default App;
