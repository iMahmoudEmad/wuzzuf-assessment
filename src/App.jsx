import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import Dropdown from './components/Dropdown';
import { getApiUrls } from './services/apis.service';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');
	
	const getAllCountries = async () => {
		await axios.get(getApiUrls().getAllCountries).then(res => {
			setCountries([...res.data.data]);
			setLoad(true);
		}).catch(err => {
			setLoad(false);
			setError(err.message);
		});
	}

	useEffect(()=> {
		getAllCountries();
	}, [])

	return (
		<div className="wrapper">
			<h2>Country</h2>
			{load && <Dropdown items={countries} />}
        </div>
	);
}

export default App;
