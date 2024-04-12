import React, { useContext, useState } from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';

export default function MainPanel() {
    const {mainContent} = useContext(WorldContentContext);
    
    return (<>
        <div>
            <p>{mainContent.id}</p>
        </div>
    </>);
}
