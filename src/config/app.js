import { getEnv } from 'systems/utils/helper';

const appConfig = {
  apiUrl: getEnv('REACT_APP_API_URL'),
  basename: getEnv('PUBLIC_URL'),
};

export default appConfig;
