import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import CurrencyForm from './CurrencyForm';
import axios from 'axios';

const ApiRequest = props => {

    const datosApi = async (moneda, arrayMonedas, fecha) => {
      const API_KEY = '50fa7bc8baf3adcd789fd4f835a4c26efc766b9a99f4082bb4e4a9f22e10096a';

      const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${moneda}&tsyms=${arrayMonedas}&ts=${fecha}&api_key=${API_KEY}`;

      const resultado = await axios.get(url);

      console.log(resultado);
    };

    return (
      <div className="col-lg-6 col-md-6 col-sm-12">
        <CurrencyForm datosApi={datosApi} />
      </div>
    );
}

ApiRequest.propTypes = {

}

export default ApiRequest;
