import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.scss';

const Dropdown = ({ items, details, prevValue, inputValue }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(inputValue || '');

	const toggleOpen = () => setOpen(!open);
	const inputEl = useRef(null);

	const setSelectedItem = (item) => {
		if (item) {
			setSelected((prev) => checkIfItemHasPreviousValue(prev, item));
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

	const changeInputValue = (e) => setSelected(e.target.value);

	return (
		<div className='dd'>
			<div className='dd--header'>
				<input
					className='dd--input'
					ref={inputEl}
					type='text'
					placeholder='Select your country'
					value={selected?.attributes?.name || selected}
					onClick={checkIfInputFoucs}
					onChange={(e) => changeInputValue(e)}
				/>
			</div>

			{open && (
				<ul className='dd--body-list'>
					{items
						.filter((item) =>
							item?.attributes?.name
								.toLowerCase()
								.includes(
									selected?.attributes?.name.toLowerCase() ||
										selected.toLowerCase()
								)
						)
						.map((item) => (
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
