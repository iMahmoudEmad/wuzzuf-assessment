import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';

const Dropdown = ({ items, details, inputValue, prevValue }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const inputEl = useRef();

	const setSelectedItem = (item) => {
		setSelected((prev) => checkIfItemHasPreviousValue(prev, item));
		setSearchValue(item);
		setOpen(!open);
		if (details) details(item);
	};

	const checkIfItemHasPreviousValue = (prev, value) => {
		if (prev && prevValue) prevValue(prev);
		return value;
	};

	const checkIfInputFocus = () => {
		inputEl.current.focus();
		if (!open) setOpen(true);
	};

	const changeInputValue = (e) => setSearchValue(e.target.value);

	const filteredItems = items.filter((item) => {
		if (searchValue.length) {
			return item?.attributes?.name
				.toLowerCase()
				.includes(
					searchValue?.attributes?.name.toLowerCase() ||
						searchValue.toLowerCase()
				);
		}

		return items;
	});

	return (
		<div className='dd'>
			<div className='dd--header'>
				<input
					className='dd--input'
					ref={inputEl}
					type='text'
					placeholder='Select your country'
					value={inputValue ? '' : searchValue?.attributes?.name || searchValue}
					onClick={checkIfInputFocus}
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
