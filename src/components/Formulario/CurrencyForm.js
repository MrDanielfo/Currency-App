import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import Error from './Error';

const CurrencyForm = ({ datosApi }) => {

    const initialState = {
        currency: '',
        currencies: [],
        date: ''
    }

    const options = [
      { value: 'USD', label: 'Dólar Norteamericano' },
      { value: 'GBP', label: 'Libra Esterlina' },
      { value: 'CAD', label: 'Dólar Canadiense' },
      { value: 'EUR', label: 'Euro' },
      { value: 'JPY', label: 'Yen Japonés' },
      { value: 'BRL', label: 'Peso Brasileño' },
      { value: 'SEK', label: 'Corona Sueca' },
      { value: 'ARS', label: 'Peso Argentino' },
      { value: 'DKK', label: 'Corona Danesa' },
      { value: 'MXN', label: 'Peso Mexicano ' }
    ];

    const [formData, setFormData ] = useState(initialState);
    const [errorForm, setErrorForm ] = useState(false);

    const { currency, date } = formData;

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value });

    const seleccionMonedas = (e) => {
        setFormData({...formData, currencies: e})
    }

    const sendData = e => {
      e.preventDefault();

      // validación del primer campo del formulario
      if (currency === '' || currency === null) {
        setErrorForm(true);
        return;
      }

      // destructurando el objeto para obtener el arreglo de monedas a comparar
      const data = formData;
      const { currencies } = data;

      // validando que existan monedas a comparar y si existe se crear un arreglo que extraiga sólo su valor

      if (currencies === []) {
        setErrorForm(true);
        return;
      } 

      let monedasArr = [];
      
      currencies.forEach(currency => {
        monedasArr.push(currency.value);
      });

      // el arreglo de monedas se pasa a string separado por comas para que la API pueda leer sus valores correctamente
      let monedasString = monedasArr.toString();

      // validando que el usuario no elija más de siete monedas lo que daría un arreglo de más de 30 caracteres.
      // Y la documentación de la API señala que el límite de caracteres para monedas a comparar es de 30
      if (monedasString.length > 30) {
        setErrorForm(true);
        return;
      }

      // validando el campo de la fecha y que el usuario seleccione una
      if (date === '' || date === undefined || date === null) {
        setErrorForm(true);
        return;
      }

      // si la fecha es seleccionada se lleva a cabo el método para convertirla a Timestamp Unix
      // el cual es el método que acepta la API para las fechas
      let fecha = date.split('-').join('.');
      const fechaConvertida = new Date(fecha).getTime() / 1000;
      /* 
        Si todos los datos están bien validados se envían los parámetros a la función que nos llega por medio de props, 
        la cual en el otro componente hará la request a la API, además se vuelve a pasar como falso el estado de los errores, en caso de
        que el usuario se haya equivocado la primera vez que intentó enviar los datos  
      */
     setErrorForm(false);
     datosApi(currency, monedasString, fechaConvertida, date);

      // Aquí podría enviarse la fecha sin convertir en otra función
    };

    const message = "Los campos deben estar seleccionados correctamente y no se debe exceder de las 7 monedas a comparar";
    const showErrors = (errorForm) ? <Error message={message} /> : null;

    return (
      <div className="mt-2 mb-3 py-1">
        {showErrors}
        <form onSubmit={sendData}>
          <legend className="my-4">Escoge las monedas</legend>
          <div className="form-group">
            <label htmlFor="currency">Moneda principal</label>
            <select
              name="currency"
              className="form-control"
              id="currency"
              value={currency}
              onChange={e => onChange(e)}
            >
              <option value="">Selecciona la moneda principal</option>
              <option value="MXN">Peso Mexicano</option>
              <option value="USD">Dólar Estadunidense</option>
              <option value="GBP">Libra Esterlina</option>
              <option value="EUR">Euro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="currencies">Monedas a comparar, puedes seleccionar un máximo de 7 </label>
            <Select 
                className="form-control mb-4"
                options={options}
                isMulti={true}
                placeholder="Seleccionar monedas"
                onChange={e => seleccionMonedas(e)}
                getOptionValue={(options) => options.value}
                getOptionLabel={(options) => options.label}
            />
          </div>

          <div className="form-group">
            <label className="my-4">
              Selecciona fecha para comparar las monedas{' '}
            </label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={date}
              onChange={e => onChange(e)}
              min="2014-01-01"
              max="2019-09-30"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4">
            Consultar
          </button>
        </form>
      </div>
    );
}

CurrencyForm.propTypes = {
  datosApi: PropTypes.func.isRequired  
}

export default CurrencyForm
