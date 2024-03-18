// This should be a page that gives a basic overview of the program and lets you create a starting world if none exists or choose a world from the existing ones
import React from 'react';
import { WorldContentContext } from './world-content-context.jsx';
import { CreationModal } from './CreationModal.jsx';

export default function Welcome() {
    const {changeWorldName, createNewWorld} = React.useContext(WorldContentContext);
    const dialog = React.useRef();
    const worldNames = ["Test World"];

    function handleCreate() {
        dialog.current.open();
    }

    return (
        <div id="welcome">
            <CreationModal createFn={createNewWorld} ref={dialog}/>
            <h2>Welcome</h2>
            {!worldNames && <>
                <p>Create a world to get started.</p>
                <button onClick={handleCreate}>Create New World</button>
            </>}
            {worldNames && <>
                <p>Please choose a world.</p>
                {worldNames.map((world) => {
                    return <button key={world} onClick={() => changeWorldName(world)}>{world}</button>
                })}
            </>}
        </div>
    );
}
