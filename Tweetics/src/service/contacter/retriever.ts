import {AxiosError} from 'axios';
import {ReduxProps} from '../../types/redux/props';
import Requester from '../requester';

export function retriever<R, F>(
  url: string,
  props: ReduxProps,
  responseHandler?: (res: R) => F,
  errorHandler?: (err: AxiosError) => void,
  forceOverrideTokenManagement?: boolean,
) {
  const requester = new Requester<undefined, R, F>(
    undefined,
    url,
    'GET',
    props,
    responseHandler,
    errorHandler,
    forceOverrideTokenManagement,
  );
  return requester.query();
}
