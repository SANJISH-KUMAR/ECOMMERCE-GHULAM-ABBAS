import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';

console.log('Product Reducer');

// state contains an empty products array at the start
export const productsReducer =
    // eslint-disable-next-line no-undef
    (state = { products: [] }, action) => {
        switch (action.type) {
            case ALL_PRODUCTS_REQUEST:
                console.log('All ProductsRequest');

                return {
                    loading: true,
                    // set products to empty array when requested
                    products: [],
                };

                // IF ALL PRODUCTS HAVE BEEN FETCHED OR LOADED
            case ALL_PRODUCTS_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.products,
                    productsCount: action.payload.productsCount,
                };

            case ALL_PRODUCTS_FAIL:
                return {
                    loading: false,
                    error: action.payload,
                };

            case CLEAR_ERRORS:
                return {
                    // return whatever is there in the current state
                    // eslint-disable-next-line no-undef
                    ...state,
                    error: null,
                };

            default:
                // eslint-disable-next-line no-undef
                return state;
        }
    };