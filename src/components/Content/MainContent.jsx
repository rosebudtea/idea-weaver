import React from 'react';
import { WorldContentContext } from '../world-content-context.jsx';
import PanelController from './Panels/PanelController.jsx';
import DialogueController from './Dialogue/DialogueController.jsx';

export default function MainContent() {
    const {mainCategory, mainContent} = React.useContext(WorldContentContext);

    // Panels
    // Documents: Snippets, Works
    // Timelines
    // Dialogue (This is only for game development so this isn't a priority for right now and maybe should be a separate project)
    // Outlines

    function renderContent() {
        switch (mainCategory) {
            case "elements":
                return <PanelController />;
            case "dialogue":
                return <DialogueController />;
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
