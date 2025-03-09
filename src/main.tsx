import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer.ts'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const store = configureStore({ reducer })

// store.subscribe(() => console.log(store.getState()))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
