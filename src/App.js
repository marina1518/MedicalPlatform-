
import './App.css';
import Appadmin from './pages/Applicationadmin/Appadmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux'
function App() {
   const chosencomp = useSelector(state => state.sidebarcomp)
   console.log(chosencomp);
  return (
    <div className="App">
       <Appadmin/>
    </div>
  );
}

export default App;
