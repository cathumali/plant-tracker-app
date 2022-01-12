import React, { useState, useEffect } from 'react';  
import Editor from './Editor'
import { APP_CONFIG } from '../../utils/config';
import Layout from '../../components/Layout';
import Router from 'next/router'

const ErrorMessage = () =>{
  return (
    <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
      <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <div>
          <span className="font-medium">Ooops!</span> Please check your entries and try again!.
      </div>
    </div>
  );
}

export default function Form() {

  const [ error_display, setErrorDisplay] = useState(false);
  const [ form_values, setValues] = useState({
    name: '',
    species: '',
    instructions: '',
    photo: null
  });

  const setStateValues = ( name, value ) => setValues({ ...form_values, [name] : value})

  /**
   * Handle input change
   * @param {*} e 
   */
  const handleChange = (e) => {
    const {
      value,
      name
    } = e.target;
    setErrorDisplay(false);
    setStateValues( name, value );
    e.preventDefault();
  }
  
  /**
   * Image file upload
   * @param {*} e 
   */
  const handleFileChange = (e) => {
    const { files, name } = e.target;
    setErrorDisplay(false);
    setStateValues(name, files[0])
  }

  /**
   * Save form date
   * @param {*} data 
   */
  const submitForm = (data) => {
    let formData = new FormData();
    for ( let key in data ) {
      formData.append( key, data[key] );
    } 
    const requestHeaders = {
      method: 'POST',
      credentials: "same-origin",
      body: formData
    }
    fetch(APP_CONFIG.API_URL, requestHeaders).then(res => res.json() ).then(res => {
      if(res?.code == 200) {
        Router.push('/');
      }else {
        setErrorDisplay(true);
      }
    });
  }

  /**
   * handle form submit
   * @param {*} e 
   * @returns 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = !Object.values(form_values).some(x => x !== null && x !== '');
    if( isEmpty) {
      return null;
    }
    submitForm(form_values);
  }

  return (
    <Layout>
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="text-gray-600">
          <p className="font-medium text-lg">Add new plant</p>
          <p>Please fill out all the fields.</p>
        </div>

        <div className="lg:col-span-2">
          { error_display && <ErrorMessage /> }
          <form encType="multipart/form-data" onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-5">
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={handleChange} />
            </div>

            <div className="md:col-span-5">
              <label className="text-sm font-medium" htmlFor="species">Species</label>
              <input type="text" name="species" id="species" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={handleChange} />
            </div>

            <div className="md:col-span-5">
              <label className="text-sm font-medium" htmlFor="photo">Upload Photo</label>
              <input 
                type="file" 
                id="photo" 
                name="photo"
                onChange={handleFileChange}
                className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
              />
            </div>

            <div className="md:col-span-5">
              <label className="text-sm font-medium" htmlFor="instructions">Instructions</label>
              <Editor setStateValues={setStateValues} />
            </div>
            
            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div> 
    </Layout>
  )
}
