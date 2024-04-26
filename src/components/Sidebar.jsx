import React from 'react';
import { WorldContentContext } from './world-content-context.jsx';
import "./sidebar.css";

export default function Sidebar() {
    const {changeTab} = React.useContext(WorldContentContext);

    return (
        <div id="sidebar">
            <div id="side-buttons">
                <button onClick={() => changeTab('elements')}>E</button>
                <button onClick={() => changeTab('timelines')}>T</button>
                <button onClick={() => changeTab('outlines')}>O</button>
                <button onClick={() => changeTab('works')}>W</button>
            </div>
        </div>
    );
}
