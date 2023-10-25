import { useCallback, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const Notepad = (props:any) => {

    const {noteList, noteID, content, updateList} = props;

    const onChange = (newContent: any, delta: any, source: any, editor: any) => {        
        const index = noteList.findIndex((item:any) => item.id === noteID);

        if(editor.getLength() > 1){
            const header = editor.getContents().ops[0];
            let str = header.insert;
            str = str.replace(/\s/g, '');
            const title = str.length ? header.insert : "Untitled";

            const data = {
                title : title,
                content : newContent,
                id : noteID
            }
            // console.log(data);
            
            index > -1 ? noteList[index] = data : noteList.push(data);
        }else{
            if(index > -1){
                noteList.splice(index, 1)
                console.log(`Note at index ${index} was removed`);
            };
        }
            
        // Save to note list to local storage
        const exportList = JSON.stringify(noteList);
        localStorage.setItem("noteList", exportList);

        // Pass new note list to parent
        updateList(noteList);
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