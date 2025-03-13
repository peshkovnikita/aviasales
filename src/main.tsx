import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

import { Provider } from 'react-redux';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import rootReducer from './reducer.ts'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const loggerMiddleware = store => next => action => {
    const result = next(action);
    console.log('Middleware', store.getState())
    return result
}

export const getTicketsThunk = store => next => action => {
    const result = next(action);
    console.log('Middleware', store.getState())
    return result
}

const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(loggerMiddleware),
    devTools: true,
});

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
