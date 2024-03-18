import React from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';

export default function DialogueController() {
    const {mainContent} = React.useContext(WorldContentContext);

    return (<>
        <p>Dialogue</p>
        <p>{mainContent}</p>
    </>);
}
