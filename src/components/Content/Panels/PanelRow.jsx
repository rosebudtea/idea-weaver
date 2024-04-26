import React, { useEffect, useReducer, useRef, useState } from 'react';
import Panel from './Panel.jsx';
import DeleteButton from '../../DeleteButton.jsx';
import { createPanel, fetchAllPanels } from '../../../elementhttp.js';

function panelsReducer(state, action) {
    if (action.type === "SET_PANELS") {
        return {...state, panels: [...action.payload]};
    } else if (action.type === "ADD_PANEL") {
        return {...state, panels: [...state.panels, action.payload]};
    }
    return state;
}

export default function PanelRow({row}) {
    const [rowEditing, setRowEditing] = useState(false);
    const [panelsState, panelsDispatch] = useReducer(panelsReducer, {panels: []});
    const [isFetching, setIsFetching] = useState(false);
    const titleRef = useRef();
    // console.log(panels);

    useEffect(() => {
        async function fetchAllPans() {
            setIsFetching(true);
            try {
                fetchAllPanels(panelsDispatch, row.id);
            } catch (err) {
                setError({ message: err.message || "Failed to fetch places" });
            }
            setIsFetching(false);
        }

        fetchAllPans();
    }, []);
 
    function handleSetRowEditing(edit) {
        setRowEditing(edit);
    }

    function saveRow() {
        handleSetRowEditing(false);
        updatePanelRow(row.rowNum, titleRef.current.value);
    }

    function addPanel() {
        setIsFetching(true);
        try {
            // dispatchFn, panelName, panelNum, panelType, rowId, starred
            createPanel(panelsDispatch, "New Panel", panelsState.panels.length, "info", row.id, false);
        } catch (err) {
            console.log(err);
            // setError({ message: err.message || "Failed to fetch places" });
        }
        setIsFetching(false);
    }

    return (<>
        <div id="panel-row">
            <div id="panel-row-title">
                <h3 id="title">{row.name} {row.num}</h3>
                {/* {!rowEditing && <>
                    <h3 id="title">{row.name} {row.num}</h3>
                    <button onClick={() => handleSetRowEditing(true)}>E</button>
                </>}
                {rowEditing && <>
                    <input type="text" defaultValue={row.name} ref={titleRef} />
                    <button onClick={() => saveRow()}>S</button>
                </>} */}
                {/* <DeleteButton onConfirm={() => removePanelRow(row.id)} /> */}
            </div>
            <div id="row-content">
                {panelsState.panels.length > 0 && panelsState.panels.map((panel) => {
                    return (<Panel key={panel.num} panel={panel} rowNum={row.num} />);
                })}
                <button id="add-panel-button" onClick={() => addPanel()}>+</button>
            </div>
        </div>
    </>);
}
