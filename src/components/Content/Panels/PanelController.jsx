import React, { useContext } from 'react';
import PanelRow from './PanelRow.jsx';
import { PanelsContentContext } from './panels-content-context.jsx';
import "./panels.css";
import MainPanel from './MainPanel.jsx';
import { WorldContentContext } from '../../world-content-context.jsx';

export default function PanelController() {
    const {worldName, mainContent} = useContext(WorldContentContext);
    const {panelRows, addPanelRow, savePanels} = useContext(PanelsContentContext);

    function getPanelRowNames() {
        const titles = panelRows.map((row) => {
            return row.rowTitle;
        })
        return titles;
    }

    // Panel Object
    // panels row list: [{panelRow1}, {panelRow2}]
    // panel row: {rowTitle: "row title", rowNum: num, panels: [{panel1}, {panel2}]}
    // panel: {panelTitle: "column title", panelNum: num, panelType: "panel type", starred: bool, panelContent: [{content1}, {content2}]}
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
            <MainPanel rowTitles={getPanelRowNames()} />
            <div id="panel-container">
                {/* <button id="edit-panels-button" onClick={handleSetMove}>{move ? "SP" : "EP"}</button> */}
                <button id="save-panels-button" onClick={() => savePanels(mainContent.id, worldName, mainContent.category, mainContent.contentName, panelRows)}>Save</button>
                <button id="add-panel-row-button" onClick={addPanelRow}>+</button>
                <div id="divider" />
                {panelRows.map((panelRow, index) => {
                    return (<div key={index}>
                        <PanelRow row={panelRow} />
                        <div id="divider" />
                    </div>);
                })}
            </div>
        </div>
    )
}
