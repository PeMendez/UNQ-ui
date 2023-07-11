import { setAuthToken } from './api/AxiosConfig'
import Browser from './routes/BrowserRouter'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('token')
  if (token) {
    setAuthToken(token)
  }

const App = () => {
  return (
    <div>
      <Browser />
      <ToastContainer />
    </div>
  )
}

export default App
