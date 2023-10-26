import { useCallback, useEffect } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const Notepad = (props:any) => {

    const {content, updateList} = props;

    const onChange = (newContent: any, delta: any, source: any, editor: any) => {
        if(editor.getLength() > 1){
            const header = editor.getContents().ops[0];
            let str = header.insert;
            str = str.replace(/\s/g, '');
            const title = str.length ? header.insert : "Untitled";

            const data = {
                title : title,
                content : newContent
            }            
            updateList(data);
        }        
    };

    const quill = useCallback((node:any) => {
        if(node){
            node = node.getEditor();
            node.focus();
            node.formatLine(0, 0, 'header', 1);
            
            node.on('editor-change', function() {
                node.formatLine(0, 0, 'header', 1);
                if(node.getLength() === 1) node.root.classList.add("ql-blank");                
            });
        }
    }, []);

    return (
        <ReactQuill
            ref={quill}
            theme="bubble"
            placeholder='Your story'
            value={content}
            onChange={onChange}
            modules={{ toolbar: toolBarOptions }}
        />
    );
}

export default Notepad;