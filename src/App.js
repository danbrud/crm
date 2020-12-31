import React, { useEffect } from 'react'
import './App.css';
import { fetchClients, selectClientStatus } from './state/slices/clientsSlice'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { CLIENT_STATUSES } from './CONSTS';



const App = () => {
  const dispatch = useDispatch()
  const clientStatus = useSelector(selectClientStatus)

  useEffect(() => {
    if (clientStatus === CLIENT_STATUSES.idle) {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])

  return (
    <>
      <NavBar />
      <Routes />
    </>
  )
}

export default App;
