import React from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';

export default function PanelController() {
    const {mainContent} = React.useContext(WorldContentContext);
    const [panels, setPanels] = React.useState([]);

    // Panel Object
    // panels row list: [{panelRow1}, {panelRow2}]
    // panel row: {rowTitle: "row title", rowNum: num, rowPanels: [{panel1}, {panel2}]}
    // panel: {panelTitle: "panel title", panelContent: [{content1}, {content2}]}
    // content: {contentTitle: "content title", contentType: "type", contentActual: {actual}}
    // actual:
        // image: {image: image, descrip: "description text"}
        // text: {text: "text"}
        // number: {num: num}
        // slider: {value: value, right: "rightTitle", left: "leftTitle"}

    function handleAddPanelRow() {
        setPanels((prevPanels) => {
            const newPanelRow = {
                rowTitle: "",
                rowPanels: [{panelTitle: "", panelContent: []}],
            }

            return [...prevPanels, newPanelRow];
        })
    }

    function handleAddPanelToRow() {
        newPanel = {panelTitle: "", panelContent: []};

    }

    function handleAddContentToPanel() {
        
    }

    return (
        <>
            <h3>Panels</h3>
            <p>{mainContent.id}</p>
            <button id="add-panel-row-button" onClick={handleAddPanelRow}>+</button>
            {panels.map((panelrow) => {
                console.log(panelrow);
                return (<>
                    <div id="panel-row">
                        <div id="panel">Panel</div>
                        <button id="add-panel-to-row-button">++</button>
                    </div>
                    <button id="add-panel-row-button" onClick={handleAddPanelRow}>+</button>
                </>);
            })}
        </>
    )
}