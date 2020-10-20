import React, { useState, useRef } from 'react';
import './Dropdown.scss';

const Dropdown = ({ items, details, prevValue }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const inputEl = useRef();

	const setSelectedItem = (item) => {
		if (item) {
			setSelected((prev) => checkIfItemHasPreviousValue(prev, item));
			setSearchValue(item);
			setOpen(!open);
			if (details) details(item);
		}
	};

	const checkIfItemHasPreviousValue = (prev, value) => {
		if (prev && prevValue) prevValue(prev);
		return value;
	};

	const checkIfInputFoucs = () => {
		inputEl.current.focus();
		if (!open) setOpen(true);
	};

	const changeInputValue = (e) => setSearchValue(e.target.value);

	const filteredItems = items.filter((item) =>
		(item?.attributes?.name || item)
			.toLowerCase()
			.includes(
				searchValue?.attributes?.name.toLowerCase() || searchValue.toLowerCase()
			)
	);

	return (
		<div className='dd'>
			<div className='dd--header'>
				<input
					className='dd--input'
					ref={inputEl}
					type='text'
					placeholder='Select your country'
					value={searchValue?.attributes?.name || searchValue}
					onClick={checkIfInputFoucs}
					onChange={(e) => changeInputValue(e)}
				/>
			</div>

			{open && (
				<ul className='dd--body-list'>
					{filteredItems.map((item) => (
						<li
							key={item.id}
							className={selected.id === item.id ? 'selected' : ''}>
							<button type='button' onClick={() => setSelectedItem(item)}>
								{item?.attributes?.name}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
