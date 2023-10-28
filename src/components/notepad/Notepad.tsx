import { useCallback, useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

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
                <h1><div className="your-text">
                        <span>Y</span><span>o</span><span>u</span><span>r</span><span> </span>
                    </div>
                    <div id="ph-text">{
                        phArr.map((name)=>{
                            const chars = name.split('');
                            return(
                                <div key={name} className="ph-text-item">
                                    {chars.map((char, i)=>{
                                        return(
                                            <span key={char+i}>{char}</span>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }</div>
                    <div className="dot-text">
                        <span> </span><span>.</span><span>.</span><span>.</span>                        
                    </div>
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