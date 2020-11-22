import React from 'react'

import { createTest, readTest } from './services/firestore';

export default function App() {
  const [test, setTest] = React.useState(null)

  React.useEffect(() => {
    createTest({
      name: "nome aqui 5",
      idade: 53
    })
  }, [])

  React.useEffect(() => {
    readTest().then(res => setTest(res))
  }, [])

  return (
    <div>
      Teste database
      {test ? <ul>
          ul
          {test.map((item, i) => {
            return <li key={i}>li: {item.randomNumber}</li>
          })}
        </ul>
        :
        <p>Carregando</p>
      }
    </div>
  );
}
