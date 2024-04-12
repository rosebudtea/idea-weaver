import React, { useState } from 'react';

export default function Dropdown({buttonText, menuItems}) {
    const [open, setOpen] = useState(false);

    function handleSetOpen() {
        setOpen((prev) => !prev);
    }

    return (<div className="dropdown">
        <button onClick={handleSetOpen}>{buttonText}</button>
        {open && (
            <ul className="menu">
                {menuItems.map((menuItem, index) => (
                    <li key={index} className="menu-item">
                        {React.cloneElement(menuItem, {
                            onClick: () => {
                                menuItem.props.onClick();
                                setOpen(false);
                            },
                        })}
                    </li>
                ))}
            </ul>
        )}
    </div>);
}
