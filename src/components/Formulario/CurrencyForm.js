import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';

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
      { value: 'ARS', label: 'Peso Argentino'},
      { value: 'DKK', label: 'Corona Danesa'}
    ];

    const [formData, setFormData ] = useState(initialState);

    const { currency, date } = formData;

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value });

    const seleccionMonedas = (e) => {
        setFormData({...formData, currencies: e})
    }

    const sendData = e => {
        e.preventDefault();
        const data = formData;
        const { currencies } = data;
        let monedasArr = []; 
        currencies.forEach(currency => {
            monedasArr.push(currency.value)
        })

        let monedasString = monedasArr.toString()

        if(monedasString.length >= 30) {
            console.log('Estás excediendo el límite de siete monedas')
            return; 
        }

        let fecha = date.split('-').join('.');
        const fechaConvertida = new Date(fecha).getTime() / 1000;
  
        datosApi(currency, monedasString, fechaConvertida);
        // Aquí podría enviarse la fecha sin convertir en otra función
    }

     

    return (
      <div className="my-5">
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
              required
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
                className="form-control mb-5"
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
      </div>
    );
}

CurrencyForm.propTypes = {
  datosApi: PropTypes.func.isRequired  
}

export default CurrencyForm
