import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import { WorldContentContext } from './components/world-content-context.jsx';
import Welcome from './components/Welcome.jsx';
import MainContent from './components/Content/MainContent.jsx';
import ElementSidebar from './components/ElementSidebar.jsx';
import WorksSidebar from './components/WorksSidebar.jsx';

export default function Base() {
    const {worldName, mainCategory} = React.useContext(WorldContentContext);

    return (
        <>
            {!worldName && <Welcome />}
            {worldName && <div id="main">
                <Sidebar />
                {mainCategory && mainCategory === "elements" && <ElementSidebar />}
                {mainCategory && mainCategory !== "elements" && <WorksSidebar />}
                <MainContent />
            </div>}
        </>
    );
}
