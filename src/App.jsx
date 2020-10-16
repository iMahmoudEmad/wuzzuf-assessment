import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown';
import { getAllCountries } from './services/countries.service';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');


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
			{load && <Dropdown items={countries} />}
        </div>
	);
}

export default App;
