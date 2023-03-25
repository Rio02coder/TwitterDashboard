import axios, {AxiosInstance, AxiosError, AxiosResponse, Method} from 'axios';
import {BASE_URL} from './server';
import store from '../redux/store';
import {AccessTokenRequest, Token} from '../types/Token';
import {URLS} from './urls';
import {Alert} from 'react-native';
import {ReduxProps} from '../types/redux/props';
import {User} from '../types/User';

class UnauthorizedError extends Error {
  constructor() {
    super('User is unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

class BackendError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BackendError.prototype);
  }
}

/**
 * A requester class taking care of token management
 * of network calls.
 */
class Requester<T = undefined, R = void, F = void> {
  private data: T;
  private responseHandler?: (res: R) => F;
  private url: string;
  private method: Method;
  private props: ReduxProps;
  private errorHandler?: (err: AxiosError) => void;
  private baseServer: AxiosInstance;
  private forceOverrideTokenManagement: boolean;
  constructor(
    data: T,
    url: string,
    method: Method,
    props: ReduxProps,
    responseHandler?: (res: R) => F,
    errorHandler?: (err: AxiosError) => void,
    forceOverrideTokenManagement?: boolean,
  ) {
    this.data = data;
    this.responseHandler = responseHandler;
    this.url = url;
    this.method = method;
    this.props = props;
    this.errorHandler = errorHandler;
    this.baseServer = axios.create({
      headers: {
        Authorization: `Bearer ${store.getState().user?.token.access}`,
        Accept: 'application/json',
      },
    });
    this.forceOverrideTokenManagement = forceOverrideTokenManagement
      ? forceOverrideTokenManagement
      : false;
  }

  private setTokenToBaseServer(token: string) {
    this.baseServer = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log(store.getState().user.token);
  }

  /**
   * This method assumes that the
   * refresh token of the user is
   * already present. It should be
   * trivial to see why this is true.
   */
  private getTokenRetrievalData(): AccessTokenRequest {
    // console.log('user', store.getState().user);
    return {
      token: store.getState().user.token.refresh,
    };
  }

  /**
   * This method retrieves the token and updates it to redux
   */
  private getToken() {
    // console.log('In get token');
    const tokenData: AccessTokenRequest = this.getTokenRetrievalData();
    // console.log(tokenData);
    const requestData: string = JSON.stringify(tokenData);
    // console.log(requestData);
    return this.baseServer
      .post(BASE_URL + URLS.AUTHENTICATION.refreshToken, requestData)
      .then((response: AxiosResponse<User>) => {
        // console.log('Got a response');
        // console.log(response.data);
        this.props.loginUser(response.data);
        this.setTokenToBaseServer(response.data.token.access);
        // baseServer.request({
        //   headers: {Authorization: `Bearer ${response.data.token.access}`},
        // });
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Something seems to be wrong with your session. Please exit the app and re login.',
        );
      });
  }

  private onSuccess(response: R) {
    // console.log(response);
    if (this.responseHandler) {
      return this.responseHandler(response);
    }
  }

  private onError(err: AxiosError) {
    // console.log(err.response?.status);
    switch (err.response?.status) {
      case 401:
        throw new UnauthorizedError();
      default:
        throw new BackendError(err.message);
    }
  }

  private handleError(err: AxiosError) {
    if (this.errorHandler) {
      this.errorHandler(err);
      return;
    }
    // Default behaviour nothing could be done.
    // To handle error you must pass an error handler.
    return Promise.resolve();
  }

  private getQueryResponse() {
    // axios.interceptors.request.use(request => {
    //   console.log('REQUEST HEADERS!!!!!!', request.headers);
    //   console.log(
    //     'REDUX ACCESS TOKEN !!!!',
    //     store.getState().user.token.access,
    //   );
    //   return request;
    // });

    switch (this.method) {
      case 'GET':
        return this.baseServer
          .get(BASE_URL + this.url)
          .then((response: AxiosResponse<R>) => this.onSuccess(response.data))
          .catch((err: AxiosError) => this.onError(err));
      case 'POST':
        return this.baseServer
          .post(BASE_URL + this.url, JSON.stringify(this.data))
          .then((response: AxiosResponse<R>) => this.onSuccess(response.data))
          .catch((err: AxiosError) => {
            // console.log('Reached Here');
            this.onError(err);
          });
      default:
        return Promise.reject('Method not accepted for now');
    }
  }

  public queryWithCustomToken(token: Token['access']) {
    return this.baseServer
      .get(BASE_URL + this.url, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response: AxiosResponse<R>) => this.onSuccess(response.data))
      .catch((err: AxiosError) => {
        return Promise.reject();
      });
  }

  public query() {
    return this.getQueryResponse()
      .then(() => {
        return Promise.resolve();
      })
      .catch(err => {
        if (this.forceOverrideTokenManagement === true) {
          return this.handleError(err as AxiosError);
        }
        const error = err as Error;
        switch (error.constructor) {
          case UnauthorizedError:
            this.getToken()
              .then(() => {
                return this.getQueryResponse();
              })
              .catch(() => {});
          case BackendError: {
            // console.log('In backend error');
            return this.handleError(err as AxiosError);
          }
        }
      });
  }
}

export default Requester;
