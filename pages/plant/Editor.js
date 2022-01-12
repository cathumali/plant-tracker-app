import React, {useState, useRef} from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(import('jodit-react'), { ssr: false });

const RichtextEditor = (props) => {

	const editor = useRef(null)
	const [content, setContent] = useState('')

	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
  
  const handleBlur = (value) => {
    if(!value) {
      return null;
    }
    setContent(value)
    props.setStateValues('instructions', value)
  }

	return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => handleBlur(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
}

export default RichtextEditor;

