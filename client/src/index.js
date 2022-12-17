import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { store, persistor } from './redux/store'
import GlobalStyles from './assert/globalStyles/GlobalStyles'
import { PersistGate } from 'redux-persist/integration/react'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </PersistGate>
    </Provider>

)
