import 'whatwg-fetch';
import React from 'react';
import thunk from 'redux-thunk';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connectReducerMiddleware } from 'redux-in-place';
import Home from './src/Views/Home';
import rootReducer from './rootReducer';

const reduxMiddleware = applyMiddleware(
    thunk.withExtraArgument({
      fetch: (url, options = {}, ...args) => {
        options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        };
        url = `https://cap_america.inkitt.de${url}`;
        return fetch(url, options, ...args).then((response) => {
          if (!response.ok) {
            console.log('error ocurred; request errors can be generically treated from here');
          }
          return response;
        });
      },
    }),
);

const store = createStore(connectReducerMiddleware(rootReducer), reduxMiddleware);

export default function App() {
  return (
    <Provider store={store} >
      <View style={{ flex: 1, backgroundColor: '#F0EAD6' }}>
        <Home />
      </View>
    </Provider>
  );
}

