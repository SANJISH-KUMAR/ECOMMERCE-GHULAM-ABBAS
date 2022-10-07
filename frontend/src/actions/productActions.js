// since we have to send the request to the backend we import axios
import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';

export const getProducts = () => async(dispatch) => {
    // see reducers/productReducers and constants/productConstants for product Constants
    try {
        // when we dispatch it it takes the foll action exported in productReducers.js
        // case ALL_PRODUCTS_REQUEST:
        // return {
        //     loading: true,
        //     // set products to empty array when requested
        //     products: [], // creates empty array
        // };
        // type is type of action
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        console.log('ProductActions');

        // pull / import data from backend using backend route using axios library
        // start backend server first by setting proxy in package.json "proxy": "http://192.168.1.4:4000"
        // Note proxy should be your computers IPv4 address . Start->settings->Network & Internet->wi fi
        //->Sanjish (Connected Secured)->IPv4 address
        // so our url actually becomes "http://192.168.1.4:4000/api/v1/products"
        const { data } = await axios.get('/api/v1/products');

        // after pulling the data from backend we will dispatch it
        // dispatch () is the method in redux used to dispatch actions and trigger state changes
        // to the store
        dispatch({
            // from productReducers.js
            // case ALL_PRODUCTS_SUCCESS:
            //     return {
            //         loading: false,
            //         products: action.payload.products,
            //         productsCount: action.payload.productsCount,
            //     };

            type: ALL_PRODUCTS_SUCCESS,
            //Payload is a non-official, community accepted ( de facto) naming convention for the property
            //that holds the actual data in a Redux action object
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// clear errors

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};