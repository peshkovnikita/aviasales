import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer.ts'
//@ts-ignore
import logger from 'redux-logger'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(logger),
    devTools: true
});

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
