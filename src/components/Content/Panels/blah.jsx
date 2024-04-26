import React, { createContext, useReducer } from "react";

export const PanelsContentContext = createContext({
    panelRows: [],
    addPanelRow: () => {},
    removePanelRow: () => {},
    updatePanelRow: () => {},
    addPanelToRow: () => {},
    removePanelFromRow: () => {},
    updatePanelInRow: () => {},
    addContentToPanel: () => {},
    removeContentFromPanel: () => {},
    updateContentInPanel: () => {},
    savePanels: () => {},
});

function panelsReducer(state, action) {
    if (action.type === "ADD_PANEL_ROW") {
        console.log("ADD PANEL ROW");
        const newPanelRow = {
            rowTitle: "New Panel Row",
            rowNum: state.panelRows.length,
            panels: [{panelTitle: "New Panel", panelNum: 0, panelType: "info", starred: false, panelContent: []}],
        };
        return {...state, panelRows: [...state.panelRows, newPanelRow]};
    } else if (action.type === "REMOVE_PANEL_ROW") {
        console.log("REMOVE PANEL ROW");
        let stateCopy = JSON.parse(JSON.stringify(state));
        let panelRows = stateCopy.panelRows.filter((row) => row.rowNum !== action.rowNum);
        return {...state, panelRows: [...panelRows]};
    } else if (action.type === "UPDATE_PANEL_ROW") {
        console.log("UPDATE PANEL ROW");
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                row.rowTitle = action.rowTitle;
            }
        });
        return {...state, panelRows: [...stateCopy.panelRows]};
    } else if (action.type === "ADD_PANEL") {
        console.log("ADD PANEL TO ROW");
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                let newPanel = {panelTitle: "New Panel", panelNum: row.panels.length, panelType: action.panelType, starred: false, panelContent: []};
                row.panels.push(newPanel);
            }
        });
        return {...state, panelRows: [...stateCopy.panelRows]};
    } else if (action.type === "REMOVE_PANEL") {
        console.log("REMOVE PANEL FROM ROW");
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                let panels = row.panels.filter((panel) => panel.panelNum !== action.panelNum);
                row.panels = [...panels];
            }
        });
        return {...state, panelRows: [...stateCopy.panelRows]};
    } else if (action.type === "UPDATE_PANEL") {
        console.log("UPDATE PANEL IN ROW");
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                row.panels.forEach((panel) => {
                    if (panel.panelNum === action.panelNum) {
                        panel.panelTitle = action.panelTitle;
                        panel.starred = action.starred;
                    }
                })
            }
        });
        return {...state, panelRows: [...stateCopy.panelRows]};
    } else if (action.type === "ADD_PANEL_CONTENT") {
        console.log("ADD CONTENT TO PANEL");
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                row.panels.forEach((panel) => {
                    if (panel.panelNum === action.panelNum) {
                        let content = {contentTitle: "", contentNum: panel.panelContent.length, contentType: action.contentType, contentActual: {}};
                        switch (action.contentType) {
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
        return {...state, panelRows: [...stateCopy.panelRows]};
    } else if (action.type === "REMOVE_PANEL_CONTENT") {
        console.log("REMOVE CONTENT FROM PANEL");
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                row.panels.forEach((panel) => {
                    if (panel.panelNum === action.panelNum) {
                        let newContent = panel.panelContent.filter((content) => {
                            return content.contentNum !== action.contentNum
                        });
                        panel.panelContent = [...newContent];
                    }
                });
            }
        });
        return {...state, panelRows: [...stateCopy.panelRows]};
    } else if (action.type === "UPDATE_PANEL_CONTENT") {
        console.log("UPDATE CONTENT IN PANEL");
        console.log(action.newContent);
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.panelRows.forEach((row) => {
            if (row.rowNum === action.rowNum) {
                row.panels.forEach((panel) => {
                    if (panel.panelNum === action.panelNum) {
                        panel.panelContent.forEach((content) => {
                            if (content.contentNum === action.newContent.contentNum) {
                                console.log("HERE");
                                content.contentTitle = action.newContent.title;
                                content.contentActual = action.newContent.actual;
                            }
                        });
                    }
                });
            }
        });
        return {...state, panelRows: [...stateCopy.panelRows]};
    }
    return state;
}

export default function PanelsContentContextProvider({children}) {
    const [panelsState, panelsDispatch] = useReducer(panelsReducer, {panelRows: []});

    function handleAddPanelRow() {
        panelsDispatch({
            type: "ADD_PANEL_ROW",
        });
    }

    function handleRemovePanelRow(rowNum) {
        panelsDispatch({
            type: "REMOVE_PANEL_ROW",
            rowNum,
        });
    }

    function handleUpdatePanelRow(rowNum, rowTitle) {
        panelsDispatch({
            type: "UPDATE_PANEL_ROW",
            rowNum,
            rowTitle,
        });
    }

    function handleAddPanelToRow(rowNum, panelType) {
        panelsDispatch({
            type: "ADD_PANEL",
            rowNum,
            panelType,
        });
    }

    function handleRemovePanelFromRow(rowNum, panelNum) {
        panelsDispatch({
            type: "REMOVE_PANEL",
            rowNum,
            panelNum,
        });
    }

    function handleUpdatePanelInRow(rowNum, panelNum, panelTitle, starred) {
        panelsDispatch({
            type: "UPDATE_PANEL",
            rowNum,
            panelNum,
            panelTitle,
            starred,
        });
    }

    function handleAddContentToPanel(rowNum, panelNum, contentType) {
        panelsDispatch({
            type: "ADD_PANEL_CONTENT",
            rowNum,
            panelNum,
            contentType,
        });
    }

    function handleRemoveContentFromPanel(rowNum, panelNum, contentNum) {
        panelsDispatch({
            type: "REMOVE_PANEL_CONTENT",
            rowNum,
            panelNum,
            contentNum,
        });
    }

    function handleUpdateContentInPanel(rowNum, panelNum, newContent) {
        panelsDispatch({
            type: "UPDATE_PANEL_CONTENT",
            rowNum,
            panelNum,
            newContent,
        });
    }

    function handleSavePanels(id, worldName, category, name, panels) {
        console.log("Save Panels");
    }

    const ctxValue = {
        panelRows: panelsState.panelRows,
        addPanelRow: handleAddPanelRow,
        removePanelRow: handleRemovePanelRow,
        updatePanelRow: handleUpdatePanelRow,
        addPanelToRow: handleAddPanelToRow,
        removePanelFromRow: handleRemovePanelFromRow,
        updatePanelInRow: handleUpdatePanelInRow,
        addContentToPanel: handleAddContentToPanel,
        removeContentFromPanel: handleRemoveContentFromPanel,
        updateContentInPanel: handleUpdateContentInPanel,
        savePanels: handleSavePanels,

    };

    return <PanelsContentContext.Provider value={ctxValue}>{children}</PanelsContentContext.Provider>
}
