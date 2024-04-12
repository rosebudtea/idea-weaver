import React from 'react';
import { WorldContentContext } from '../world-content-context.jsx';
import PanelController from './Panels/PanelController.jsx';
import PanelsContentContextProvider from './Panels/panels-content-context.jsx';

export default function MainContent() {
    const {mainContent} = React.useContext(WorldContentContext);

    // Panels
    // Documents: Snippets, Works
    // Timelines
    // Dialogue (This is only for game development so this isn't a priority for right now and maybe should be a separate project)
    // Outlines

    function renderContent() {
        switch (mainContent.category) {
            case "elements":
                return (<PanelsContentContextProvider>
                    <PanelController />
                </PanelsContentContextProvider>);
            case "timelines":
                return <p>Timelines</p>;
            case "outlines":
                return <p>Outlines</p>;
            case "works":
                return <p>Documents</p>;
            default:
                return <p>Please choose something to work on</p>;
        }
    }

    return (
        <div id='main-content'>
            {mainContent && renderContent()}
            {!mainContent && <p>Please choose something to work on</p>}
        </div>
    );
}
