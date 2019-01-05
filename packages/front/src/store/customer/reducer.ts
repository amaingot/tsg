import { Reducer } from 'redux';
import { CustomerActionTypes, CustomerState } from './types';

const initialState: CustomerState = {
  loading: false,
  errors: undefined,
  customers: undefined,
};

const reducer: Reducer<CustomerState> = (state = initialState, action) => {
  switch (action.type) {
    case CustomerActionTypes.FETCH_CUSTOMERS_START: {
      return { ...state, loading: true };
    }
    case CustomerActionTypes.FETCH_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };
    }
    case CustomerActionTypes.FETCH_CUSTOMERS_FAILURE: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as CustomerReducer };
