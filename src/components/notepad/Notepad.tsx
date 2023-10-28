import { useCallback, useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";
import TypeText from '../typetext/TypeText';

const Notepad = (props:any) => {

    // For editor placeholder text     
    const phArr = [
        'masterpiece', 
        'story', 
        'art', 
        'song', 
        'adventure', 
        'plan'
    ];
    
    const {noteID, content, updateList} = props;
    const [value, setValue] = useState(content);
    const [phActive, setphActive] = useState(true);    

    useEffect(() => {
        setValue(content);        
    }, [noteID]);    
    
    const onChange = (newContent: any, delta: any, source: any, editor: any) => {
        setValue(newContent);

        const header = editor.getContents().ops[0];
        let str = header.insert;
        str = str.replace(/\s/g, '');
        const title = str.length ? header.insert : "Untitled";
        
        const data = {
            title : title,
            content : newContent,
            id : noteID,
            number: 1
        }
        updateList(editor.getLength() > 1 ? data : null);        
    };

    const quill = useCallback((quill:any) => {
        if(quill){
            quill = quill.getEditor();
            quill.focus();
            quill.formatLine(0, 0, 'header', 1);
            
            quill.on('editor-change', function() {
                quill.formatLine(0, 0, 'header', 1);
                setphActive(quill.getLength() === 1);
            });                                               
        }
    }, []);

    return (
        <>
            <div className={`placeHolderAnim ${phActive && 'active'}`}>
                <h1>
                    <div className="text-wrapper">
                        <span>Y</span><span>o</span><span>u</span><span>r</span>
                    </div>
                    <TypeText text={phArr[0]} />
                    {/* <div id="dot-text" className="text-wrapper">
                        <span> </span><span>.</span><span>.</span><span>.</span>
                    </div> */}
                </h1>
            </div>
            <ReactQuill
                ref={quill}
                theme="bubble"
                value={value}
                onChange={onChange}
                modules={{ toolbar: toolBarOptions }}
            />
        </>
    );
}

export default Notepad;