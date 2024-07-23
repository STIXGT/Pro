import React, { useState } from 'react';
import Loading from './components/Loading'; 
import './App.css';
import Table from './Table';


function App() {

  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY= //API KEY
  


async function sendRequest(){

  let inputSystemIa = `Eres un experto en proformas. Quiero que analices el Json que te voy a pasar y quiero que me enlistes todos los productos en orden de menor a mayor precio con todos sus datos. Ten en cuenta que hay algunos productos de diferentes marcas, que son practicamente el mismo, pero con diferente precio y diferente nombre. Quisiera saber que empresa tiene el producto mas econocimico y que este analisis lo hagas con todos los productos. Este es un ejemplo de como me gustaria que me des la respuesta: 
  Producto | Marca | Cantidad | Precio Unitario(EN TODA LA TABLA SOLO QUIERO LOS TITULOS UNA VEZ)
  Leche Entera | Marca A | 10 | 1.50 

  
  Quiero que me pases todos los productos en orden de (productos del mismo tipo) del mas economico en precio unitario al mas caro de cada producto y luego pasa al siguiente producto.
  mas o menos asi:
  nombre-producto1 | marca1 | cantidad1 | precio1
  nombre-producto1 | marca2 | cantidad2 | precio2
  nombre-producto1 | marca3 | cantidad3 | precio3
(SEPERANDO CON UNA LINEA)
  nombre-producto2 | marca1 | cantidad1 | precio1
  nombre-producto2 | marca2 | cantidad2 | precio2
  nombre-producto2 | marca3 | cantidad3 | precio3

  LOS MAS ECONOMICOS PRIMERO
  No quiero otro dato que no sea el de la tabla.
  No te olvides de poner sus titulos en la tabla.
  Se muy riguroso en seguir el ejemplo de tabla que te di. NO AUMENTES MAS ESPACIOS, NI SEPARACIONES, NI COSAS EXTRAS, SOLO RESPETA LOS TITULOS Y QUE SU CONTENIDO VAYA ACORDE AL TITULO.
  Si no te pasan un Json o no puedes leerlo, por favor, responde con un mensaje de error asi: Inserte un Json valido.
`
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: inputSystemIa,
        },

        {
          role: 'user',
          content: inputMessage,
        }
      ],

    }),
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    setOutputMessage(data.choices[0].message.content);

    setLoading(false)
  }
  catch (error) {
    console.error('Error:', error);
  }
}

  function handleChat(e) {

    e.preventDefault();
    if (inputMessage === '') {
      alert('Porfavor inserte una proforma');
    } else {
      sendRequest();
      setLoading(true)

    }
    
  }

  function newProforma(){
    if (inputMessage === '' && outputMessage === '') {
      alert('Porfavor inserte una proforma');
    } else {
    setInputMessage('');
    setOutputMessage('');
    setLoading(false)
    }
  }


  return (
    <>
    <h1>Proformas Genesis</h1>
    <form 
    className='form'
    onSubmit={ handleChat }
    >
      <textarea 
        className='input-message'
        type="text" 
        name="input" 
        placeholder='Inserte proforma aqui...'
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        autoComplete="off" ></textarea>
     
      <div className='button-action'>
        <button type="submit">Enviar Proforma</button>
        <button type='button' onClick={newProforma}>Nueva Proforma</button>
      </div>

      {loading && <Loading type={'spin'} color={'#fff'} />}
      {(outputMessage==='Inserte un Json valido.') ? 
            'Inserte un Json valido'
            : <Table textData={outputMessage} /> }

    </form>
   

  </>
  );
}

export default App;
