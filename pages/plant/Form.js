import React, { useState, useEffect } from 'react';  
import Image from 'next/image'

export default function Form() {

  const [ form_values, setValues] = useState({
    name: '',
    specie: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const {
      value,
      name
    } = e.target;
    setValues({
      ...form_values,
      [name] : value
    })
    e.preventDefault();
  }


  const submitForm = (data) => {
    let formData = new FormData();
    for ( let key in data ) {
      formData.append( key, data[key] );
    } 
    const requestHeaders = {
      method: 'POST',
      headers: {
        "transfer-encoding": "chunked",
        "Cache-Control": "no-cache, private",
      },
      credentials: "same-origin",
      body: formData
    }
    fetch(`http://plant-tracker-app.test/api/plants`, requestHeaders).then(res => res.json() ).then(res => {

    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = !Object.values(form_values).some(x => x !== null && x !== '');
    if( isEmpty) {
      return null;
    }
    submitForm(form_values);
  }
  
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 mb-6">Add </h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Plant Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label className="text-sm font-medium" htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={handleChange} />
                  </div>
    
                  <div className="md:col-span-5">
                    <label className="text-sm font-medium" htmlFor="species">Species</label>
                    <input type="text" name="species" id="species" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={handleChange} />
                  </div>

                  <div className="md:col-span-5">
                    <label className="text-sm font-medium" htmlFor="instructions">Instructions</label>
                    <textarea 
                      onChange={handleChange} 
                      className="mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none
                        focus:border-sky-500
                        focus:ring-1
                        focus:ring-sky-500
                        focus:invalid:border-red-500 focus:invalid:ring-red-500"
                      id='instructions'
                      name="instructions"
                      placeholder="Write something">
                    </textarea>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}
