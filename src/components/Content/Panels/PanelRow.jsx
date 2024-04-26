import React, { useEffect, useRef, useState } from 'react';
import Panel from './Panel.jsx';
import DeleteButton from '../../DeleteButton.jsx';
import { fetchAllPanels } from '../../../elementhttp.js';

export default function PanelRow({row}) {
    const [rowEditing, setRowEditing] = useState(false);
    const [panels, setPanels] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const titleRef = useRef();
    // console.log(panels);

    useEffect(() => {
        async function fetchAllPans() {
            setIsFetching(true);
            try {
                fetchAllPanels(setPanels, row.id);
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

    return (<>
        <div id="panel-row">
            <div id="panel-row-title">
                {!rowEditing && <>
                    <h3 id="title">{row.name} {row.num}</h3>
                    <button onClick={() => handleSetRowEditing(true)}>E</button>
                </>}
                {rowEditing && <>
                    <input type="text" defaultValue={row.name} ref={titleRef} />
                    <button onClick={() => saveRow()}>S</button>
                </>}
                <DeleteButton onConfirm={() => removePanelRow(row.id)} />
            </div>
            <div id="row-content">
                {panels.length > 0 && panels.map((panel) => {
                    return (<Panel key={panel.num} panel={panel} rowNum={row.num} />);
                })}
                <button id="add-panel-button" onClick={() => addPanelToRow(row.rowNum)}>+</button>
            </div>
        </div>
    </>);
}
