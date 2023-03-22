import React, {useEffect} from 'react';
import Navigator from './routes/NavigationStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';

class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
