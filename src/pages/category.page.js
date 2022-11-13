import './category.styles.scss'
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

//import { CategoriesContext } from '../contexts/categories.context';
import ProductCard from '../components/product-card/product-card.component';

import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../store/categories/categories.selector'


  

export default function Category() {
  const { category } = useParams();
  //const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const [ products, setProducts] = useState(categoriesMap[category]);

  //console.log(category);
  useEffect(() => {
    //console.log("category page useeffect")
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'> {category.toUpperCase()} </h2>
      <div className='category-container'>
        {
            products && products.map((product) =>
            <ProductCard key={product.id} product={product} />
          )
        }
      </div>
    </Fragment>
  )
}