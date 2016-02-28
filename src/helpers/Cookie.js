import cookie from 'cookie';
import { isClient } from 'helpers';

export default {
    get(name) {
        if (isClient()) {
            return cookie.parse(document.cookie)[name];
        }

        return null;
    },
    set(name, value, options) {
        if (isClient()) {
            document.cookie = cookie.serialize(name, value, options);
        }
    },
    remove(name) {
        this.set(name, '', { expires: new Date(0) });
    }
};
