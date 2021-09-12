import logo from './logo.svg';
import './App.css';
import LongUrlInput from './components/LongUrlInput';

function App() {
  return (
    <div className="App" style={{height: "100vh"}}>
      <div style={{height: "100vh", background: "black", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <h2 style={{color: "#eee"}}> Mern URL Shorterner </h2>
        <LongUrlInput/>
        </div>
      </div>
    </div>
  );
}

export default App;
