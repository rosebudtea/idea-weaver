// This should be a page that gives a basic overview of the program and lets you create a starting world if none exists or choose a world from the existing ones
import React, { useEffect, useState } from 'react';
import { WorldContentContext } from './world-content-context.jsx';
import { CreationModal } from './CreationModal.jsx';
import { fetchWorlds } from '../worldhttp.js';

export default function Welcome() {
    const {createWorld, changeWorld} = React.useContext(WorldContentContext);
    const [isFetching, setIsFetching] = useState(false);
    const [worlds, setWorlds] = useState([]);
    const dialog = React.useRef();

    useEffect(() => {
        async function fetchAllWorlds() {
            setIsFetching(true);
            try {
                fetchWorlds(setWorlds);
            } catch (err) {
                setError({ message: err.message || "Failed to fetch worlds" });
            }
            setIsFetching(false);
        }

        fetchAllWorlds();
    }, []);

    function handleCreate() {
        dialog.current.open();
    }

    return (
        <div id="welcome">
            <CreationModal createFn={createWorld} ref={dialog}/>
            <h2>Welcome</h2>
            {isFetching && <p>Getting available worlds. Please wait a moment</p>}
            {(!worlds || worlds.length == 0) && !isFetching && <>
                <p>Create a world to get started.</p>
                <button onClick={handleCreate}>Create New World</button>
            </>}
            {worlds && worlds.length > 0 && !isFetching && <>
                <p>Please choose or create a world.</p>
                {worlds.map((world) => {
                    return <button key={world.id} onClick={() => changeWorld(world)}>{world.name}</button>
                })}
                <button onClick={handleCreate}>Create New World</button>
            </>}
        </div>
    );
}
