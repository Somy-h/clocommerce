import './shop.styles.scss';
import React, { Fragment } from 'react';
//import { CategoriesContext } from "../contexts/categories.context";
import CategoryPreview from '../components/category-preview/category-preview.component'

import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../store/categories/categories.selector'
import Spinner from '../components/spinner/spinner.component'

export default function CategoriesPreview() {

  //const {categoriesMap} = useContext(CategoriesContext);
  // use redux instead of context
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading
        ? (<Spinner />)
        : ( 
          Object.keys(categoriesMap).map(category => (
            <CategoryPreview key={category} title={category} products={categoriesMap[category]} />
          ))
          )
        }
    </Fragment>
  )
}