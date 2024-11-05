import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 


const store = configureStore();
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
