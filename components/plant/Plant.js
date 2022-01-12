import React from 'react'; 
import List from './List';
import Link from 'next/link';

export default function Plant(props) {
  const {
    plants
  } = props;
  return (
    <div className="container px-5 mx-auto">
    <div className="flex flex-wrap w-full mb-8">
      <div className="w-full mb-6 lg:mb-0">
        <div className="grid grid-cols-2 gap-4 place-content-stretch">
          <h1 className="sm:text-3xl text-5xl font-bold font-medium title-font mb-2 text-gray-900">Plants</h1>
          <div className="px-6 py-2 text-right">
            <Link href="/plant/add">
              <a className="bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out">Add new</a>
            </Link>           
          </div>
        </div>
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
