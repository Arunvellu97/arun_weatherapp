import { useState } from 'react'
import './App.css'
import Search from './Components/Search'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Search/>
    </>
  )
}

export default App
