import React from 'react'; 
import Image from 'next/image'

export default function List(props) {
  const {
    name,
    species,
    photo,
    instructions,
  } = props;
  console.log(props)
  return (
    <div className="lg:w-1/3 p-4 w-1/2">
      <a className="block relative h-48 rounded overflow-hidden">
      <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={photo} />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ species }</h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{ name }</h2>
        {/* <p className="mt-1"></p> */}
        { instructions }
      </div>
    </div>
  )
}
