import './index.css';

import { createRoot } from 'react-dom/client';

import Demo from './Demo';
import Thing from './Thing';

createRoot(
  document.getElementById('root')
).render(<Thing />)
