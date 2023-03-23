import {AxiosError} from 'axios';
import {ReduxProps} from '../../types/redux/props';
import Requester from '../requester';

export function sender<T, R, F>(
  url: string,
  data: T,
  props: ReduxProps,
  responseHandler: (res: R) => F,
  errorHandler?: (err: AxiosError) => void,
  forceOverrideTokenManagement?: boolean,
) {
  const requester = new Requester<T, R, F>(
    data,
    url,
    'POST',
    props,
    responseHandler,
    errorHandler,
    forceOverrideTokenManagement,
  );
  return requester.query();
}
