import React from 'react'; 
import Image from 'next/image'
import parse from 'html-react-parser';
import { APP_CONFIG } from '../../utils/config';

const noImageDiv ={ background: "#e5e7eb69" };
export default function List(props) {
  const {
    name,
    species,
    photo,
    instructions,
  } = props;
  const imgSrc = `${APP_CONFIG.IMG_BASE_URL}/${photo}`;
  const instructionsContent = instructions && parse(instructions);
  return (
    <div className="lg:w-1/3 p-4 w-1/2">
      <a className="block relative h-48 rounded overflow-hidden" style={!(photo&&photo!="null")?noImageDiv:{}}>
        { (photo&&photo!="null") && 
          <img 
            alt="plant" 
            className="object-cover object-center w-full h-full block" 
            src={imgSrc}
          />
        }
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ species }</h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{ name }</h2>
        <small><span className="text-gray-500">INSTRUCTIONS:</span></small>{ instructionsContent }
      </div>
    </div>
  )
}
