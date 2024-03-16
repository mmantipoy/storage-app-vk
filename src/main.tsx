import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider>
     <AdaptivityProvider>
       <App />
     </AdaptivityProvider>
   </ConfigProvider>
 </Provider>
</React.StrictMode>,
);