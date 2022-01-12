import React, { useState, useEffect } from 'react';
import Plant from '../components/plant/Plant'
import { APP_CONFIG } from '../utils/config';
import Layout from '../components/Layout'
import Loader from '../components/Loader'

export default function Home() {
 
  const [ loadingPlants, setLoading ] = useState(false);
  const [ plantsArr, setPlantsArr ] = useState([]);

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
}
