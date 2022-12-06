import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import GlobalStyles from './assert/globalStyles/GlobalStyles'

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
