import React, { useState, Fragment } from 'react';
import CurrencyForm from './CurrencyForm';
import axios from 'axios';
import Spinner from '../Layout/Spinner';
import GraphResult from '../Graphs/GraphResult';

const ApiRequest = () => {

    const [spinner, setStateSpinner ] = useState(false);
    const [result, setResult] = useState({});
    const [moneda, setMoneda] = useState('');
    const [fecha, setFecha] = useState('');

      const datosApi = async (moneda, arrayMonedas, timestamp, date) => {
        const API_KEY =
          '50fa7bc8baf3adcd789fd4f835a4c26efc766b9a99f4082bb4e4a9f22e10096a';
        const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${moneda}&tsyms=${arrayMonedas}&ts=${timestamp}&api_key=${API_KEY}`;

        const resultado = await axios.get(url);
        //console.log(moneda)
        const { data } = resultado;

        // Mostrar spinner
        setStateSpinner(true);

        // Ocultar spinner de carga y agregar el resultado
        setTimeout(() => {
          setStateSpinner(false);
          setResult(data[moneda]);
          setMoneda(moneda);
          setFecha(date)
        }, 2000);
      };

    const component = spinner 
          ? <Spinner /> 
          : <GraphResult 
              result={result}
              moneda={moneda}
              fecha={fecha}
            />;

    return (
      <Fragment>
        <div className="col-md-6 col-sm-12">
          {component}
        </div>
        <div className="col-md-6 col-sm-12">
          <CurrencyForm datosApi={datosApi} />
        </div>
      </Fragment>
    );
}

export default ApiRequest;