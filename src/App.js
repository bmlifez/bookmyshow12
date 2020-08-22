import React from 'react';
import Home from './app/components/home/home';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </Provider>
  );
}

export default App;
