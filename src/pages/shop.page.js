import './shop.styles.scss';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import CategoriesPreview from './categories-preview.page'
import Category from './category.page';
//import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

//import React, { useContext, Fragment } from 'react';
//import { CategoriesContext } from "../contexts/categories.context";
//import CategoriesPreview from '../components/category-preview/category-preview.component'
//import ProductCard from '../components/product-card/product-card.component';

// thunk function
//import { fetchCategoriesAsync } from '../store/categories/categories.action'

import { fetchCategoriesStart } from '../store/categories/categories.action'

export default function Shop() {

  const dispatch = useDispatch();

  // Using Redux Thunk
  // useEffect(() => {
  //   dispatch(fetchCategoriesAsync())
  // }, []);

  // Using Redux Saga
  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  )
}



  