import React, { useContext, useState } from 'react';
import { WorldContentContext } from '../../world-content-context.jsx';
import PanelRow from './PanelRow.jsx';
import { PANELS } from '../../../testdata/paneldata.jsx';

export default function PanelController() {
    const {mainContent} = useContext(WorldContentContext);
    const [panelRows, setPanelRows] = useState(PANELS);

    // Panel Object
    // panels row list: [{panelRow1}, {panelRow2}]
    // panel row: {rowTitle: "row title", rowNum: num, panels: [{panel1}, {panel2}]}
    // panel: {panelTitle: "column title", panelNum: num, panelType: "panel type", panelContent: [{content1}, {content2}]}
        // panelType:
        // image: 
            // image panel - images
        // info:
            // information panel - text, numbers, and sliders
    // content: {contentTitle: "content title", contentNum: num, contentType: "content type", contentActual: {actual}}
    // actual:
        // text: {header: "title", text: "text", descrip: "description text"}
        // number: {header: "title", num: num, descrip: "description text"}
        // slider: {header: "title", value: value, right: "rightTitle", left: "leftTitle", descrip: "description text"}
        // image: {image: image, descrip: "description text"}

    function handleAddPanelRow() {
        setPanelRows((prevPanelRows) => {
            const newPanelRow = {
                rowTitle: "",
                rowNum: prevPanelRows.length,
                panels: [{panelTitle: "New Panel", panelNum: 0, panelType: "info", panelContent: []}],
            };
            return [...prevPanelRows, newPanelRow];
        })
    }

    function handleAddPanelToRow(rowNum) {
        setPanelRows((prevPanelRows) => {
            prevPanelRows.forEach((row) => {
                if (row.rowNum === rowNum) {
                    let newPanel = {panelTitle: "", panelNum: row.panels.length, panelContent: []};
                    row.panels.push(newPanel);
                }
            });
            return [...prevPanelRows];
        })
    }

    function handleAddContentToPanel(rowNum, panelNum, contentType) {
        setPanelRows((prevPanelRows) => {
            prevPanelRows.forEach((row) => {
                if (row.rowNum === rowNum) {
                    row.panels.forEach((panel) => {
                        if (panel.panelNum === panelNum) {
                            let content = {contentTitle: "Title", contentNum: panel.panelContent.length, contentType: contentType, contentActual: {}};
                            switch (contentType) {
                                case "number":
                                    content.contentActual = {num: 0, descrip: ""};
                                    break;
                                case "slider":
                                    content.contentActual = {value: 0, right: "", left: "", descrip: ""};
                                    break;
                                case "image":
                                    content.contentActual = {image: "image", descrip: ""};
                                    break;
                                case "text":
                                default:
                                    content.contentActual = {text: "insert text here", descrip: ""};
                                    break;
                            }
                            panel.panelContent.push(content);
                        }
                    });
                }
            });
            return [...prevPanelRows];
        })
    }

    function updateContent(rowNum, panelNum, contentNum, newContent) {
        setPanelRows((prevPanelRows) => {
            prevPanelRows.forEach((row) => {
                if (row.rowNum === rowNum) {
                    row.panels.forEach((panel) => {
                        if (panel.panelNum === panelNum) {
                            panel.panelContent.forEach((content) => {
                                if (content.contentNum === contentNum) {

                                }
                            });
                        }
                    });
                }
            });
            return [...prevPanelRows];
        })
    }

    return (
        <div id="content-container">
            <div>
                <p>{mainContent.id}</p>
            </div>
            <div id="panel-container">
                {/* <button id="edit-panels-button" onClick={handleSetMove}>{move ? "SP" : "EP"}</button> */}
                <button id="add-panel-row-button" onClick={handleAddPanelRow}>+</button>
                <div id="divider" />
                {panelRows.map((panelRow) => {
                    return (<>
                        <PanelRow key={panelRow.rowNum} row={panelRow} addPanelToRow={handleAddPanelToRow} addContentToPanel={handleAddContentToPanel} updateContent={updateContent} />
                        <div id="divider" />
                    </>);
                })}
            </div>
        </div>
    )
}
