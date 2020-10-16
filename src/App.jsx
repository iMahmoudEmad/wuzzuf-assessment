import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown';
import { getAllCountries, getCountryDetails } from './services/countries.service';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');


	function getSelectedCountryId(selectedCountry){
		setSelectedCountry(selectedCountry.id)
		console.log('selectedCountry', selectedCountry);
		getCountryDetails(selectedCountry.id).then(res => setCountry([...res.data.data]));
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
			
			{ selectedCountry?.id == "56" &&
				<>
					<h2>City</h2>
					<Dropdown items={country} />
				</>
			}
        </div>
	);
}

export default App;
