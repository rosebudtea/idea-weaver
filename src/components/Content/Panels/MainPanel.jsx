import React, { useContext } from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';

export default function MainPanel({rowTitles}) {
    const {mainContent} = useContext(WorldContentContext);
    console.log(mainContent);

    return (<div>
        <p>{mainContent.name}</p>
        <ol>
            {rowTitles.map((title, index) => {
                return (<li key={index}>{title}</li>);
            })}
        </ol>
    </div>);
}
