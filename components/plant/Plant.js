import React from 'react'; 
import Image from 'next/image'
import List from './List'

export default function Plant(props) {
  const {
    plants
  } = props;
  return (
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-8">
      <div className="w-full mb-6 lg:mb-0">
        <h1 className="sm:text-4xl text-5xl font-bold font-medium title-font mb-2 text-gray-900">Plants</h1>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
    </div>
    <div className="flex flex-wrap -m-4">
      {
        plants.map((plant,index) => {
          return <List {...plant} key={index} />
        })
      }      
    </div>
  </div>
  )
}
