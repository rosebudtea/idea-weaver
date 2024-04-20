import React, { useContext, useRef, useState } from 'react';
import Panel from './Panel.jsx';
import { PanelsContentContext } from './panels-content-context.jsx';
import DeleteButton from '../../DeleteButton.jsx';

export default function PanelRow({row}) {
    const [rowEditing, setRowEditing] = useState(false);
    const {addPanelToRow, removePanelRow, updatePanelRow} = useContext(PanelsContentContext);
    const titleRef = useRef();

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
                    <h3 id="title">{row.rowTitle} {row.rowNum}</h3>
                    <button onClick={() => handleSetRowEditing(true)}>E</button>
                </>}
                {rowEditing && <>
                    <input type="text" defaultValue={row.rowTitle} ref={titleRef} />
                    <button onClick={() => saveRow()}>S</button>
                </>}
                <DeleteButton onConfirm={() => removePanelRow(row.rowNum)} />
            </div>
            <div id="row-content">
                {row.panels.map((panel) => {
                    return (<Panel key={panel.panelNum} panel={panel} rowNum={row.rowNum} />);
                })}
                <button id="add-panel-button" onClick={() => addPanelToRow(row.rowNum)}>+</button>
            </div>
        </div>
    </>);
}
