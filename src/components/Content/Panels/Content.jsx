import React, { forwardRef, useRef, useState } from 'react';
import Dropdown from './Dropdown.jsx';

import './content.css';

const ContentTitle = forwardRef(function ContentTitleBatch({contentTitle, menuItems, editing, saveContent}, ref) {
    return (
        <div id="content-title">
            {(editing !== "all" && editing !== "title") && contentTitle && <p>{contentTitle}</p>}
            {(editing === "all" || editing === "title") && <input ref={ref} type="text" />}
            {!editing && <Dropdown
                buttonText={"E"}
                menuItems={menuItems}
            />}
            {editing && <button id="content-save-button" onClick={saveContent} >S</button>}
        </div>);
});

function TextContent({content}) {
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const textInput = useRef();
    const descripInput = useRef();

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
    }

    return (<div id="text-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("text")}>Text</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            saveContent={saveContent}
        />
        {(editing !== "all" && editing !== "text") && content.contentActual.text && <p>{content.contentActual.text}</p>}
        {(editing === "all" || editing === "text") && <input ref={textInput} type="text" />}
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} type="text" />}
    </div>)
}

function NumberContent({content}) {
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const numInput = useRef();
    const descripInput = useRef();

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
    }

    return (<div id="number-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("num")}>Number</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            saveContent={saveContent}
        />
        {(editing !== "all" && editing !== "num") && content.contentActual.num && <p>{content.contentActual.num}</p>}
        {(editing === "all" || editing === "num") && <input ref={numInput} type="text" />}
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} type="text" />}
    </div>)
}

function SliderContent({content}) {
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const slideInput = useRef();
    const leftInput = useRef();
    const rightInput = useRef();
    const descripInput = useRef();

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
    }

    return (<div id="slider-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("left")}>Left</button>,
                <button onClick={() => handleEditing("right")}>Right</button>,
                <button onClick={() => handleEditing("slide")}>Slide</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            saveContent={saveContent}
        />
        <div id="content-slider">
            {(editing !== "all" && editing !== "left") && content.contentActual.left && <p>{content.contentActual.left}</p>}
            {(editing === "all" || editing === "left") && <input ref={leftInput} type="text" />}
            {(editing !== "all" && editing !== "right") && content.contentActual.right && <p>{content.contentActual.right}</p>}
            {(editing === "all" || editing === "right") && <input ref={rightInput} type="text" />}
        </div>
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} type="text" />}
    </div>)
}

function ImageContent({content}) {
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const imageInput = useRef();
    const descripInput = useRef();

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
    }

    return (<div id="image-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("image")}>Image</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            saveContent={saveContent}
        />
        {(editing !== "all" && editing !== "image") && content.contentActual.image && <p>{content.contentActual.image}</p>}
        {(editing === "all" || editing === "image") && <input ref={imageInput} type="text" />}
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} type="text" />}
    </div>)
}

export default function Content({content, updateContent}) {
    function getContent(contentType) {
        switch(contentType) {
            case "image":
                return (<ImageContent content={content} />);
            case "slider":
                return (<NumberContent content={content} />);
            case "number":
                return (<SliderContent content={content} />);
            case "text":
            default:
                return (<TextContent content={content} />);
        }
    }

    return (<>
        {getContent(content.contentType)}
    </>);
}
