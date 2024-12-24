import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Parks />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/Park" element={<Park />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
