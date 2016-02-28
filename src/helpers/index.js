export Html from './Html';
export Cookie from './Cookie';

// eslint-disable-next-line no-new-func
export const isClient = new Function('try {return this===window;}catch(e){ return false;}');
// eslint-disable-next-line no-new-func
export const isServer = new Function('try {return this===global;}catch(e){ return false;}');
