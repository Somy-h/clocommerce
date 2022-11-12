import {createContext, useState, useEffect} from 'react';

//step 1: read json file
//import PRODUCTS from '../shop-data.json';
//---------
//step 2: write to the database(ONLY ONE TIME) 
//to read from database for later test
//
//import SHOP_DATA from '../shop-data';
//import {addCollectionAndDocuments} from '../components/utils/firebase/firebase.utils'
//----------

//step3: Finally get data from the database instead of local json file.
import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils'


export const CategoriesContext = createContext({
  categoriesMap: {} // hash table data structure not array
});

export const CategoriesProvider = ({children}) => {

  const [categoriesMap, setCategoriesMap] = useState({});

  //--------
  // FOR STEP2:
  // RUNS ONLY for ONE time to store the data into Firestore
  //--------
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);
  //---------
  

  // FOR STEP3:
  useEffect( () => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      //console.log(categoryMap);
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap();
  }, []);

  const value = {categoriesMap};
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
}