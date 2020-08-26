import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import store from './store';

import App from './components/app';

ReactDOM.render(
       <Provider store={store}>
           <Router>
               <App />
          </Router>
       </Provider>,
   document.getElementById('root')
);

serviceWorker.unregister();