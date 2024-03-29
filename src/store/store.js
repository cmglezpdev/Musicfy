import { 
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware, 
    compose 
} from 'redux'

import thunk from 'redux-thunk'
import { authReducer, uiReducer } from '../reducers';


const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
})

export const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
)