import { CONF_LOCAL } from '../environments/environment.local';
import { CONF_DEV } from '../environments/environment.dev';
import { CONF_PROD } from '../environments/environment.prod';

const ENV = 'prod';

const LOCAL: String = 'local';
const DEV: String = 'dev';
const PROD: String = 'prod';

let conf: any;

console.log('Env', ENV);

if (ENV === PROD) {
  conf = CONF_PROD;
} else if (ENV === DEV) {
  conf = CONF_DEV;
} else {
  conf = CONF_LOCAL;
}

export const AppConfig = Object.assign({}, conf);
