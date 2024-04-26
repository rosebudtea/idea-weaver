import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import { WorldContentContext } from './components/world-content-context.jsx';
import Welcome from './components/Welcome.jsx';
import MainContent from './components/Content/MainContent.jsx';
import ElementSidebar from './components/ElementSidebar.jsx';
import WorksSidebar from './components/WorksSidebar.jsx';

export default function Base() {
    const {currWorld, currTab} = React.useContext(WorldContentContext);

    return (
        <>
            {!currWorld && <Welcome />}
            {currWorld && <div id="main">
                <Sidebar />
                {currTab && currTab === "elements" && <ElementSidebar />}
                {currTab && currTab !== "elements" && <WorksSidebar />}
                <MainContent />
            </div>}
        </>
    );
}
