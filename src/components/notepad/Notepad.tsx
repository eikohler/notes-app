import { useCallback } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const Notepad = () => {
    const quill = useCallback((node:any) => {
        if(node){
            node = node.getEditor();
            node.once("selection-change", () => {                        
                node.formatLine(0, 0, 'header', 1);
            });
        }
    }, []);

    return (
        <ReactQuill
            ref={quill}
            theme="bubble"             
            modules={{ toolbar: toolBarOptions }}
        />
    );
}

export default Notepad;