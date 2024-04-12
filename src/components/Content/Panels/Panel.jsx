import React, { useState } from 'react';
import Content from './Content.jsx';
import Dropdown from './Dropdown.jsx';

export default function Panel({panel, addContentToPanel, rowNum, updateContent}) {
    const [editing, setEditing] = useState(false);

    function handleSetEditing() {
        setEditing((prev) => !prev);
    }

    function handleAddContentToPanel(type) {
        // setEditing(true);
        addContentToPanel(rowNum, panel.panelNum, type);
    }

    return (<>
        <div id="panel">
            <div id="panel-title">
                <h3 id="title">{panel.panelTitle} {panel.panelNum}</h3>
                <button onClick={handleSetEditing}>{editing ? "S" : "E"}</button>
            </div>
            {panel.panelContent.map((content) => {
                console.log(content);
                return (<Content content={content} updateContent={updateContent} />);
            })}
            <Dropdown
                buttonText={"++"}
                menuItems={[
                    <button onClick={() => handleAddContentToPanel("text")}>text</button>,
                    <button onClick={() => handleAddContentToPanel("number")}>number</button>,
                    <button onClick={() => handleAddContentToPanel("slider")}>slider</button>,
                    <button onClick={() => handleAddContentToPanel("image")}>image</button>,
                ]}
            />
        </div>
    </>);
}
