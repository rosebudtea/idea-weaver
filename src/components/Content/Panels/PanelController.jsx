import React, { useContext, useEffect, useReducer, useState } from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';
import { createPanelRow, fetchAllPanelRows } from '../../../elementhttp.js';
import MainPanel from './MainPanel.jsx';
import PanelRow from './PanelRow.jsx';
import "./panels.css";

function elementReducer(state, action) {
    if (action.type === "SET_PANEL_ROWS") {
        return {...state, panelRows: [...action.payload]};
    } else if (action.type === "ADD_PANEL_ROW") {
        return {...state, panelRows: [...state.panelRows, action.payload]};
    }
    return state;
}

export default function PanelController() {
    const {chosenEntry} = useContext(WorldContentContext);
    const [elementState, elementDispatch] = useReducer(elementReducer, {panelRows: []});
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchAllRows() {
            setIsFetching(true);
            try {
                fetchAllPanelRows(elementDispatch, chosenEntry.id);
            } catch (err) {
                setError({ message: err.message || "Failed to fetch places" });
            }
            setIsFetching(false);
        }

        fetchAllRows();
    }, []);

    function getPanelRowNames() {
        const titles = elementState.panelRows.map((row) => {
            return row.rowTitle;
        });
        return titles;
    }

    function addRow() {
        setIsFetching(true);
        try {
            createPanelRow(elementDispatch, "New Panel Group", elementState.panelRows.length, chosenEntry.id);
        } catch (err) {
            setError({ message: err.message || "Failed to fetch places" });
        }
        setIsFetching(false);
    }
 
    // Panel Object
    // panels row list: [{panelRow1}, {panelRow2}]
    // panel row: {rowId: UUID, rowTitle: "row title", rowNum: num, panels: [{panel1}, {panel2}]}
    // panel: {panelId: UUID, panelTitle: "column title", panelNum: num, panelType: "panel type", starred: bool, panelContent: [{content1}, {content2}]}
        // A panel that is starred will have it's information appear in the pop up on other pages
        // panelType:
        // image:
            // image panel - all images
        // info:
            // information panel - text, numbers, and sliders
    // content: {contentTitle: "content title", contentNum: num, contentType: "content type", contentActual: {actual}}
    // actual:
        // text: {header: "title", text: "text", descrip: "description text"}
        // number: {header: "title", num: num, descrip: "description text"}
        // slider: {header: "title", value: value, right: "rightTitle", left: "leftTitle", descrip: "description text"}
        // image: {image: image, descrip: "description text"}

    return (
        <div id="content-container">
            {!isFetching && <>
                <MainPanel rowTitles={getPanelRowNames()} />
                <div id="panel-container">
                    <button id="add-panel-row-button" onClick={addRow}>+</button>
                    <div id="divider" />
                    {elementState.panelRows.map((panelRow, index) => {
                        return (<div key={index}>
                            <PanelRow row={panelRow} />
                            <div id="divider" />
                        </div>);
                    })}
                </div>
            </>}
        </div>
    )
}
