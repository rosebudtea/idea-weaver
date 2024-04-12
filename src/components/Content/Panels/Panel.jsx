import React, { useContext, useState } from 'react';
import Content from './Content.jsx';
import Dropdown from './Dropdown.jsx';
import { PanelsContentContext } from './panels-content-context.jsx';

export default function Panel({panel, rowNum}) {
    const [editingPanel, setEditingPanel] = useState(false);
    const {addContentToPanel, removePanelFromRow} = useContext(PanelsContentContext);

    function handleSetEditingPanels() {
        setEditingPanel((prev) => !prev);
    }

    return (<>
        <div id="panel">
            <div id="panel-title">
                <button>*</button>
                <h3 id="title">{panel.panelTitle} {panel.panelNum}</h3>
                <button onClick={handleSetEditingPanels}>{editingPanel ? "S" : "E"}</button>
                <button onClick={() => removePanelFromRow(rowNum, panel.panelNum)}>-</button>
            </div>
            {panel.panelContent.map((content) => {
                return (<Content rowNum={rowNum} panelNum={panel.panelNum} content={content} />);
            })}
            <Dropdown
                buttonText={"++"}
                menuItems={[
                    <button onClick={() => addContentToPanel(rowNum, panel.panelNum, "text")}>text</button>,
                    <button onClick={() => addContentToPanel(rowNum, panel.panelNum, "number")}>number</button>,
                    <button onClick={() => addContentToPanel(rowNum, panel.panelNum, "slider")}>slider</button>,
                    <button onClick={() => addContentToPanel(rowNum, panel.panelNum, "image")}>image</button>,
                ]}
            />
        </div>
    </>);
}
