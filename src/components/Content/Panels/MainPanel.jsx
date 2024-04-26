import React, { useContext } from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';

export default function MainPanel({rowTitles}) {
    const {chosenEntry} = useContext(WorldContentContext);

    return (<div>
        <p>{chosenEntry.name}</p>
        <ol>
            {rowTitles.map((title, index) => {
                return (<li key={index}>{title}</li>);
            })}
        </ol>
    </div>);
}
