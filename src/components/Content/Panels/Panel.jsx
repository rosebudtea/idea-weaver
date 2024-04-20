import React, { useContext, useRef, useState } from 'react';
import Content from './Content.jsx';
import Dropdown from './Dropdown.jsx';
import { PanelsContentContext } from './panels-content-context.jsx';
import DeleteButton from '../../DeleteButton.jsx';

export default function Panel({panel, rowNum}) {
    const [editingPanel, setEditingPanel] = useState(false);
    const {addContentToPanel, removePanelFromRow, updatePanelInRow} = useContext(PanelsContentContext);
    const titleRef = useRef();

    function handleSetEditingPanels(edit) {
        setEditingPanel(edit);
    }

    function saveRow(star) {
        handleSetEditingPanels(false);
        updatePanelInRow(rowNum, panel.panelNum, titleRef.current ? titleRef.current.value : panel.panelTitle, star ? !panel.starred : panel.starred);
    }

    return (<>
        <div id="panel">
            <div id="panel-title">
                <button onClick={() => saveRow(true)} style={panel.starred ? {backgroundColor: 'yellow'} : {backgroundColor: 'dimgrey'}}>*</button>
                {!editingPanel && <>
                    <h3 id="title">{panel.panelTitle} {panel.panelNum}</h3>
                    <button onClick={() => handleSetEditingPanels(true)}>E</button>
                </>}
                {editingPanel && <>
                    <input type="text" defaultValue={panel.panelTitle} ref={titleRef} />
                    <button onClick={() => saveRow(false)}>S</button>
                </>}
                <DeleteButton onConfirm={() => removePanelFromRow(rowNum, panel.panelNum)} />
            </div>
            {panel.panelContent.map((content, index) => {
                return (<Content key={index} rowNum={rowNum} panelNum={panel.panelNum} content={content} />);
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
