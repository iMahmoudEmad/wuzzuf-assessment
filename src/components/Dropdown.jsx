import React, { useState, useRef } from 'react'
import './Dropdown.scss'

const Dropdown = ({items}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    const toggleOpen = () => setOpen(!open);
    const inputEl = useRef(null);

    const setSelectedItem = item => {
        if (item) {
            setSelected(item);
            setOpen(!open);
        }
    }

    const checkIfInputFoucs = () => {
        inputEl.current.focus();
        if (!open) setOpen(true);
    }

    return (
        <div className="dd">
            <div className="dd--header">
                <input className="dd--input" ref={inputEl} onClick={checkIfInputFoucs} type="text" placeholder="Select your country" value={selected?.attributes?.name} />
            </div>

            { open &&
                <ul className="dd--body-list">
                    {items.map((item) => (
                        <li key={item.id} className={selected.id == item.id ? 'selected' : ''}>
                            <button type="button" onClick={() => setSelectedItem(item)}>
                                {item?.attributes?.name}
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Dropdown
