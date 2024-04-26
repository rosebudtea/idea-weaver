import React, { createContext, useReducer } from "react";
import { createWorld, fetchElementTypes } from "../worldhttp";
import { fetchElementEntry } from "../elementhttp";

export const WorldContentContext = createContext({
    currWorld: {},
    currTab: "",
    currTabEntries: [],
    chosenEntry: {},
    createWorld: () => {},
    changeWorld: () => {},
    changeTab: () => {},
    changeChosenEntry: () => {},
});

function worldReducer(state, action) {
    if (action.type === "CHANGE_WORLD") {
        // console.log("Change World");
        // console.log(action.payload);
        return {
            ...state,
            currWorld: action.payload,
        };
    } else if (action.type === "CHANGE_TAB") {
        // console.log("Change Curr Tab");
        // console.log(action.payload);
        return {
            ...state,
            currTab: action.payload.name,
            currTabEntries: action.payload.entries,
        };
    } else if (action.type === "CHANGE_CHOSEN_ENTRY") {
        // console.log("Change Chosen Entry");
        // console.log(action);
        return {
            ...state,
            chosenEntry: action.payload,
        };
    }
    return state;
}

export default function WorldContentContextProvider({children}) {
    const [worldState, worldDispatch] = useReducer(worldReducer, {currWorld: "", currTab: "", currTabEntries: [], chosenEntry: {}});

    function createNewWorld(currWorld) {
        createWorld(handleWorldChange, currWorld);
    }

    function handleWorldChange(currWorld) {
        worldDispatch({
            type: "CHANGE_WORLD",
            payload: currWorld,
        });
    }

    function handleTabChange(tab) {
        if (tab === worldState.currTab) {
            worldDispatch({
                type: "CHANGE_TAB",
                payload: {
                    name: "",
                    entries: [],
                },
            });
        } else {
            if (tab === "elements") {
                fetchElementTypes(worldDispatch, worldState.currWorld.id);
            } else {
                // fetchAllContent(worldDispatch, "CHANGE_TAB", category, worldState.currWorld);
                worldDispatch({
                    type: "CHANGE_TAB",
                    payload: {
                        name: tab,
                        entries: [],
                    },
                });
            }
        }
    } 

    function handleChosenEntryChange(entry) {
        // console.log("Change Chosen Entry");
        if (worldState.currTab === "elements") {
            // fetchElementEntry(worldDispatch, tab, id, worldState.worldName);
                worldDispatch({
                    type: "CHANGE_CHOSEN_ENTRY",
                    payload: entry,
                });

        } else {
            console.log("Not yet implemented");
            // fetchContent(worldDispatch, worldState.currTab, id, worldState.worldName);
        }
    }

    const ctxValue = {
        currWorld: worldState.currWorld,
        currTab: worldState.currTab,
        currTabEntries: worldState.currTabEntries,
        chosenEntry: worldState.chosenEntry,
        createWorld: createNewWorld,
        changeWorld: handleWorldChange,
        changeTab: handleTabChange,
        changeChosenEntry: handleChosenEntryChange,
    };

    return <WorldContentContext.Provider value={ctxValue}>{children}</WorldContentContext.Provider>
}
