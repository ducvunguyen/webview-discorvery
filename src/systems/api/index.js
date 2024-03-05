import appConfig from 'config/app';
import ApiAuth from './ApiAuth';
import ApiFactory from './ApiFactory';

const Auth = new ApiAuth();
const Api = new ApiFactory(appConfig.apiUrl, Auth).make();

export { Auth, Api };
