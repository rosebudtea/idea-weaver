import React, { createContext, useReducer } from "react";
import { createCategory, createWorld, fetchAllContent, fetchCategories, createContent } from "../http.js";

export const WorldContentContext = createContext({
    worldName: "",
    mainCategory: "",
    mainCategoryContent: [],
    mainContent: {},
    createWorld: () => {},
    createCategory: () => {},
    createContent: () => {},
    changeWorldName: () => {},
    changeCategory: () => {},
    changeMainContent: () => {},
});

function worldReducer(state, action) {
    if (action.type === "CHANGE_WORLD") {
        console.log("Change World: " + action.payload);
        return {
            ...state,
            worldName: action.payload,
        };
    } else if (action.type === "CHANGE_CATEGORY") {
        console.log("Change Category: " + action.payload);
        return {
            ...state,
            mainCategory: action.payload.name,
            mainCategoryContent: action.payload.content,
        };
    } else if (action.type === "CHANGE_CATEGORY_CONTENT") {
        console.log("Change Category Content: " + action.payload);
        return {
            ...state,
            mainCategoryContent: action.payload,
        };
    } else if (action.type === "CHANGE_MAIN_CONTENT") {
        console.log("Change Main Content: " + action.payload);
        const content = {category: state.mainCategory, id: action.payload};
        // console.log(content);
        return {
            ...state,
            mainContent: content,
        };
    }
    return state;
}

export default function WorldContentContextProvider({children}) {
    const [worldState, worldDispatch] = useReducer(worldReducer, {worldName: "", mainCategory: "", mainCategoryContent: [], mainContent: {}});

    function createNewWorld(worldName) {
        createWorld(handleWorldChange, worldName);
    }

    function createNewCategory(categoryName) {
        console.log("Create Category");
        createCategory(categoryName, worldState.worldName);
        fetchCategories(worldDispatch, worldState.worldName);
    }

    function createNewContent(name, category) {
        console.log("Create Content");
        createContent(category, name, worldState.worldName);
    }

    function handleWorldChange(worldName) {
        worldDispatch({
            type: "CHANGE_WORLD",
            payload: worldName,
        });
    }

    function handleCategoryChange(category) {
        // console.log("Handle Category Change: " + category);
        if (category === worldState.mainCategory) {
            worldDispatch({
                type: "CHANGE_CATEGORY",
                payload: {
                    name: "",
                    content: [],
                },
            });
        } else {
            if (category === "elements") {
                fetchCategories(worldDispatch, worldState.worldName);
            } else {
                fetchAllContent(worldDispatch, "CHANGE_CATEGORY", category, worldState.worldName);
            }
        }
    }

    function handleMainContentChange(id) {
        worldDispatch({
            type: "CHANGE_MAIN_CONTENT",
            payload: id,
        });
    }

    const ctxValue = {
        worldName: worldState.worldName,
        mainCategory: worldState.mainCategory,
        mainCategoryContent: worldState.mainCategoryContent,
        mainContent: worldState.mainContent,
        createWorld: createNewWorld,
        createCategory: createNewCategory,
        createContent: createNewContent,
        changeWorldName: handleWorldChange,
        changeCategory: handleCategoryChange,
        changeMainContent: handleMainContentChange,
    };

    return <WorldContentContext.Provider value={ctxValue}>{children}</WorldContentContext.Provider>
}
