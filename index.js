import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
export const server = startServer();
