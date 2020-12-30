import React, { useEffect } from 'react'
import './App.css';
import { fetchClients, selectClientStatus } from './state/slices/clientsSlice'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './components/NavBar';
import Routes from './components/Routes';



const App = () => {
  const dispatch = useDispatch()
  const clientStatus = useSelector(selectClientStatus)

  useEffect(() => {
    if (clientStatus === 'idle') {
      //add CLIENT_STATUSES in condition
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch]) //Come back and learn why I need to add this

  return (
    <>
      <NavBar />
      <Routes />
    </>
  )
}

export default App;
