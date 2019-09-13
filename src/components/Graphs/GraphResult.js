import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const GraphResult = ({result, moneda, fecha}) => {

    // validar que le estemos pasando datos a nuestro gráfico, en caso contrario no se muestra
    if(Object.keys(result).length === 0) return null;
    let currencies = [];
    Object.entries(result).map((currency, index) => {
        return currencies[index] = {
            currency: currency[0],
            value: currency[1]
        }
    })

    return (
      <Fragment>
        <h2 className="text-center my-5">Cotización correspondiente a {fecha}</h2>
        <h3 className="text-center mt-4">El {moneda} frente a otras divisas internacionales</h3>
        <BarChart
          width={550}
          height={300}
          data={currencies}
          margin={{ top: 50, right: 0, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currency" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#dc143c" />
        </BarChart>
      </Fragment>
    );
}

GraphResult.propTypes = {
    result: PropTypes.object.isRequired,
}

export default GraphResult
