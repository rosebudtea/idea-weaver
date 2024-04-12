import React, { useState } from 'react';
import Panel from './Panel.jsx';

export default function PanelRow({row, addPanelToRow, addContentToPanel, updateContent}) {
    const [rowEditing, setRowEditing] = useState(false);

    function handleSetRowEditing() {
        setRowEditing((prev) => !prev);
    }

    return (<>
        <div id="panel-row">
            <div id="panel-row-title">
                <h3 id="title">Panel Row {row.rowNum}</h3>
                <button onClick={handleSetRowEditing}>{rowEditing ? "S" : "E"}</button>
            </div>
            <div id="row-content">
                {row.panels.map((panel) => {
                    return (<Panel key={panel.panelNum} panel={panel} addContentToPanel={addContentToPanel} rowNum={row.rowNum} updateContent={updateContent} />);
                })}
                {rowEditing && <button id="add-panel-button" onClick={() => addPanelToRow(row.rowNum)}>+</button>}
            </div>
        </div>
    </>);
}
