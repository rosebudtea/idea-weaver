import React, { createContext, useReducer } from "react";
import { PANELS } from "../../../testdata/paneldata";

export const PanelsContentContext = createContext({});

function panelsReducer(state, action) {
    if (action.type === "ADD_PANEL_ROW") {
        const newPanelRow = {
            rowTitle: "New Row",
            rowNum: prevPanelRows.length,
            panels: [{panelTitle: "New Panel", panelNum: 0, panelType: "info", panelContent: []}],
        };
        return [...state.panelRows, newPanelRow];
    } else if (action.type === "ADD_PANEL") {

    } else if (action.type === "ADD_PANEL_CONTENT") {

    } else if (action.type === "UPDATE_PANEL_CONTENT") {

    }
    return state;
}

export default function PanelsContentContextProvider({children}) {
    const [panelsState, panelsDispatch] = useReducer(contentReducer, {panelRows: [PANELS]});

    const ctxValue = {
        panelRows: panelsState.panelRows,
    };

    return <PanelsContentContext.Provider value={ctxValue}>{children}</PanelsContentContext.Provider>
}
