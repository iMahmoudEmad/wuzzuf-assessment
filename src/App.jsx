import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Dropdown from './components/Dropdown';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');
	
	useEffect(()=> {
		axios.get('http://46.101.108.59/api/countries').then(res => {
			setCountries([...res.data.data]);
			setLoad(true);
		}).catch(err => {
			setLoad(false);
			setError(err.message);
		});
		
		console.log(countries);
	}, [])

	return (
		<div className="wrapper">
			<h2>Country</h2>
			<Dropdown items={countries} />
        </div>
	);
}

export default App;
