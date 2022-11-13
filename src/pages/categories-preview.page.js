import './shop.styles.scss';
import React, { Fragment } from 'react';
//import { CategoriesContext } from "../contexts/categories.context";
import CategoryPreview from '../components/category-preview/category-preview.component'

import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../store/categories/categories.selector'

export default function CategoriesPreview() {

  //const {categoriesMap} = useContext(CategoriesContext);
  // use redux instead of context
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(category => (
          <CategoryPreview key={category} title={category} products={categoriesMap[category]} />
        ))
      }
    </Fragment>
  )
}