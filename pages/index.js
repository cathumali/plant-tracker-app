import React, { useState, useEffect } from 'react';
import Plant from '../components/plant/Plant'
import { APP_CONFIG } from '../utils/config';
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import { withRouter } from 'next/router'
import { toast } from 'react-toastify';
import Router from 'next/router'

export default withRouter(function Home(props) {
 
  const [ loadingPlants, setLoading ] = useState(false);
  const [ plantsArr, setPlantsArr ] = useState([]);
  const { router : {
    query : {
      save_success: success
    }
  }} = props;

  const processData = ( arr ) => {
    setLoading(false);
    setPlantsArr(arr.data);
  }

  const fetchPlants = async () => {
    setLoading(true);
    const res = await fetch(APP_CONFIG.API_URL);
    const data = await res.json();
    processData(data);
  }

  useEffect(()=> {          

    if( success ) {
      toast.success('Plant added Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      Router.replace('/')
    }

    fetchPlants(); 

  },[]); 

  if(loadingPlants) {
    return (<Layout><Loader /></Layout>);
  }

  return (
    <Layout>
      <Plant plants={plantsArr} />
    </Layout>
  )
})
