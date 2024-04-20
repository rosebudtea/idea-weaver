import React from 'react';
import { WorldContentContext } from './world-content-context.jsx';
import "./sidebar.css";

export default function Sidebar() {
    const {changeCategory} = React.useContext(WorldContentContext);

    return (
        <div id="sidebar">
            <div id="side-buttons">
                <button onClick={() => changeCategory('elements')}>E</button>
                {/* <button onClick={() => changeCategory('dialogue')}>D</button> */}
                <button onClick={() => changeCategory('timelines')}>T</button>
                <button onClick={() => changeCategory('outlines')}>O</button>
                <button onClick={() => changeCategory('works')}>W</button>
            </div>
        </div>
    );
}
