import React from 'react';
import './styles/table.css'; // Asegúrate de tener un archivo CSS para estilos adicionales

// Función para convertir el texto plano en un array de objetos
const parseTextToTableData = (text) => {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(' | ');
  const rows = lines.slice(1).map(line => {
    const values = line.split(' | ');
    let row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  });
  return rows;
};



export default function Table ({ textData }) {
    if (!textData) return null  
  const data = parseTextToTableData(textData);
  return (
    <div>
      <table className='table-ouput'>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

