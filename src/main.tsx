import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Entry point: mount the React app into the <div id="root"> in index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find the #root element in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
