import React, { useReducer, useRef } from 'react';
import { WorldContentContext } from './world-content-context.jsx';
import { CreationModal } from './CreationModal.jsx';
import { fetchAllContent } from '../http.js';

function elementReducer(state, action) {
    if (action.type === "CHANGE_ELEMENT_CATEGORY") {
        return {
            ...state,
            elementCategory: action.payload,
        };
    } else if (action.type === "CHANGE_ELEMENT_CONTENT") {
        return {
            ...state,
            elementContent: action.payload,
        };
    }
    return state;
}

export default function ElementSidebar() {
    const {createContent, createCategory, changeMainContent, worldName, mainCategoryContent} = React.useContext(WorldContentContext);
    const [elementState, elementDispatch] = useReducer(elementReducer, {elementCategory: "", elementContent: []});
    const elementDialog = useRef();
    const categoryDialog = useRef();

    function handleContentCreate() {
        elementDialog.current.open();
    }

    function handleCategoryCreate() {
        categoryDialog.current.open();
    }

    function handleGrabElementContent(categoryName) {
        //dispatchFn, dispatchName, category, worldName
        fetchAllContent(elementDispatch, "CHANGE_ELEMENT_CONTENT", categoryName, worldName);
    }

    function handleChooseCategory(categoryName) {
        elementDispatch({
            type: "CHANGE_ELEMENT_CATEGORY",
            payload: categoryName,
        });
        handleGrabElementContent(categoryName);
    }

    return (
        <>
            <CreationModal createFn={createContent} category={elementState.elementCategory} ref={elementDialog}/>
            <CreationModal createFn={createCategory} category={"elements"} ref={categoryDialog}/>
            <div id="content-side">
                {!elementState.elementCategory && <>
                    <div id="side-head">
                        <input type="text" />
                        <button onClick={handleCategoryCreate}>C</button>
                    </div>
                    <div id="content-buttons">
                        {mainCategoryContent.length > 0 && mainCategoryContent.map((category) => {
                            return <button key={category} onClick={() => {handleChooseCategory(category)}}>{category}</button>
                        })}
                    </div>
                </>}
                {elementState.elementCategory && <>
                    <p>{elementState.elementCategory}</p>
                    <div id="side-head">
                        <button onClick={() => {handleChooseCategory("")}}>{"<"}</button>
                        <input type="text" />
                        <button onClick={handleContentCreate}>C</button>
                    </div>
                    <div id="content-buttons">
                        {elementState.elementContent.length > 0 && elementState.elementContent.map((data) => {
                            return <button key={data.id} onClick={() => changeMainContent(data.id, elementState.elementCategory)}>{data.name}</button>;
                        })}
                    </div>
                </>}
            </div>
        </>
    );
} 
