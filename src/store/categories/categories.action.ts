import { 
    createAction, 
    Action, 
    ActionWithPayload,
    withMatcher
} from "../../utils/reducer/reducer.utils";

import { 
    CATEGORIES_ACTION_TYPES, 
    Category, 
    CategoryItem 
} from "./categories.types";
//import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'


// export const setCategories = (categories) =>
//     createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;
export type CategoryAction = 
    FetchCategoriesStart
    | FetchCategoriesSuccess
    | FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, 
        categoriesArray
    ));

export const fetchCategoriesFailed = withMatcher((error) : FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error: Error));


// //redux thunk--- 
// export const fetchCategoriesAsync = () => {
//     return async(dispatch) => {
//         dispatch(fetchCategoriesStart());

//         try {
//             const categoriesArray = await getCategoriesAndDocuments('categories'); 
//             dispatch(fetchCategoriesSuccess(categoriesArray));
//         } catch (error) {
//             dispatch(fetchCategoriesFailed(error));
//         }
//     }
// }