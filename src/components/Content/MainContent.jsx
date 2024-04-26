import React from 'react';
import { WorldContentContext } from '../world-content-context.jsx';
import PanelController from './Panels/PanelController.jsx';
import PanelsContentContextProvider from './Panels/panels-content-context.jsx';

export default function MainContent() {
    const {currTab, chosenEntry} = React.useContext(WorldContentContext);

    // Panels
    // Documents: Snippets, Works
    // Timelines
    // Outlines

    function renderContent() {
        switch (currTab) {
            case "timelines":
                return <p>Timelines</p>;
            case "outlines":
                return <p>Outlines</p>;
            case "works":
                return <p>Documents</p>;
            case "elements":
                if (chosenEntry.id) {
                    return (<PanelsContentContextProvider>
                        <PanelController />
                    </PanelsContentContextProvider>);
                }
            default:
                return <p>Please choose something to work on</p>;
        }
    }

    return (
        <div id='main-content'>
            {currTab && renderContent()}
            {!currTab && <p>Please choose something to work on</p>}
        </div>
    );
}
