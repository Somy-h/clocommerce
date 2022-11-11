import './shop.styles.scss';
import React, { useContext, Fragment } from 'react';
import { CategoriesContext } from "../contexts/categories.context";
import CategoryPreview from '../components/category-preview/category-preview.component'

export default function CategoriesPreview() {

  const {categoriesMap} = useContext(CategoriesContext);

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
