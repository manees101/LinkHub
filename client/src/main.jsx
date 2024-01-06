import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<App/>}/>
      </Routes>
      </BrowserRouter>
   
  </React.StrictMode>
  </Provider>
 
)
