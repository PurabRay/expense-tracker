import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from  './pages/Login';
import { Navigate } from 'react-router-dom';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRoutes>
        <HomePage/>
        </ProtectedRoutes>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>

    </>
  );
}

// export function ProtectedRoutes(props){
//  if(localStorage.getItem('user')){
//    return <props classname="children"></props>
// }else{
//   return <Navigate to="/login"/>
// }
// }
export function ProtectedRoutes({ children }) {
  if (localStorage.getItem('user')) {
    return children; // Render HomePage if user is authenticated
  } else {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
}
export default App;
