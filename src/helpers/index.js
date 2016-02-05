export Html from './Html';
export Cookie from './Cookie';

export let isClient = new Function("try {return this===window;}catch(e){ return false;}");
export let isServer = new Function("try {return this===global;}catch(e){ return false;}");