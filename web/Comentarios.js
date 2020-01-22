import React, { useState } from 'react';

// Componente - função que retorna um documento (html, css ou javascript) ex: function App()
// Estado - informação mantida pelo componente, lida e atualizada
// Propriedade - é um atributo de um componente

/**
 * Componente: Bloco isolado de HTML, CSS, JAVASCRIPT, o qual não interfere no restante da aplicação
 * Propriedade: INformações que um componente PAI passa para o componente FILHO
 * Estado: Informações mantidas pelo componente ( Imutabilidade )
 */

function App() {
  const [counter, setCounter] = useState(0)

  function incrementCounter(){
    setCounter(counter + 1)
  }

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}



export default App;
