import React, { useContext, useState } from 'react';
import Panel from './Panel.jsx';
import { PanelsContentContext } from './panels-content-context.jsx';

export default function PanelRow({row}) {
    const [rowEditing, setRowEditing] = useState(false);
    const {addPanelToRow, removePanelRow} = useContext(PanelsContentContext);

    function handleSetRowEditing() {
        setRowEditing((prev) => !prev);
    }

    return (<>
        <div id="panel-row">
            <div id="panel-row-title">
                <h3 id="title">Panel Row {row.rowNum}</h3>
                <button onClick={handleSetRowEditing}>{rowEditing ? "S" : "E"}</button>
                <button onClick={() => removePanelRow(row.rowNum)}>-</button>
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
