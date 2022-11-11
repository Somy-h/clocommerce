import './shop.styles.scss';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from './categories-preview.page'
import Category from './category.page';

//import React, { useContext, Fragment } from 'react';
//import { CategoriesContext } from "../contexts/categories.context";
//import CategoriesPreview from '../components/category-preview/category-preview.component'
//import ProductCard from '../components/product-card/product-card.component';

export default function Shop() {

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}



  