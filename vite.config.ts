import react from '@vitejs/plugin-react';

import jsxPlugin from './plugin';
import { UserConfig } from 'vite';

export default <UserConfig> {
  plugins: [
    react(),
    jsxPlugin()
  ]
}