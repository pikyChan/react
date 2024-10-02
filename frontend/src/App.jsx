import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/SignUp'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import Blog from './components/Blog'
import Projects from './components/Projects'
import About from './components/About'
import Single from './components/IsiBlog'



function App() {
  const [count, setCount] = useState(0)

  const Layout = ({ component: Component }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
    return (
      <>
        {!isAuthPage && <Navbar />}
        <div className="content">
          <Component />
        </div>
        {!isAuthPage && <Footer />}
      </>
    );

  };
  return (
    <Router>
      <Routes>
      <Route
          path='/'
          element={<Layout component={Blog} />}
        />
        <Route
          path='/404'
          element={<Layout component={NotFound} />}
        />
        <Route path='/post/:id' element={<Layout component={Single} />} />
        <Route 
        path='/projects'
        element={<Layout component={Projects}/>}
        />
        <Route 
        path='/about'
        element={<Layout component={About}/>}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
