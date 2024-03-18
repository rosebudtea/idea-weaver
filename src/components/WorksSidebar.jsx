import React from 'react';
import { CreationModal } from './CreationModal.jsx';
import { WorldContentContext } from './world-content-context.jsx';

export default function WorksSidebar() {
    const {mainCategory, mainCategoryContent, createContent, changeMainContent} = React.useContext(WorldContentContext);
    const dialog = React.useRef();

    function handleCreate() {
        dialog.current.open();
    }

    return (<>
        <CreationModal createFn={createContent} category={mainCategory} ref={dialog}/>
        <div id="content-side">
            <div id="side-head">
                <input type="text" />
                <button onClick={handleCreate}>C</button>
            </div>
            <div id="content-buttons">
                {mainCategoryContent.length > 0 && mainCategoryContent.map((category) => {
                    return <button key={category.id} onClick={() => {changeMainContent(category.id)}}>{category.contentName}</button>
                })}
            </div>
        </div>
    </>);
}