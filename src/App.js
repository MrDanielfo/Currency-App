import React, { Fragment } from 'react';
import Header from './components/Layout/Header';
import ApiRequest from './components/Formulario/ApiRequest';

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <ApiRequest />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
