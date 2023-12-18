import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import RequestForm from './pages/RequestForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
    return (
        <>
            <div className="app-container">
                <Router>
                    <div className='sidebar'>
                        <Sidebar />
                    </div>
                    <div className="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/RequestForm' element={<RequestForm />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </>
  );
}

export default App;
