import {ConnectedProps} from 'react-redux';
import connector from '../../redux/connector';

export type ReduxProps = ConnectedProps<typeof connector>;
