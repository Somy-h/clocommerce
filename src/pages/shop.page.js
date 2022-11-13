import './shop.styles.scss';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import CategoriesPreview from './categories-preview.page'
import Category from './category.page';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'
import { setCategories } from '../store/categories/categories.action'

//import React, { useContext, Fragment } from 'react';
//import { CategoriesContext } from "../contexts/categories.context";
//import CategoriesPreview from '../components/category-preview/category-preview.component'
//import ProductCard from '../components/product-card/product-card.component';

export default function Shop() {

  const dispatch = useDispatch();

  useEffect( () => {
    const getCategoriesMap = async () => {
      //const categoryMap = await getCategoriesAndDocuments();
      //console.log(categoryMap);
      const categoriesArray = await getCategoriesAndDocuments();
      //console.log(categoriesArray);
      dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
  }, []);


  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  )
}



  