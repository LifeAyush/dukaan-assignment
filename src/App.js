import "./App.css";
import Header from "./Components/Header/Header";
import Payments from "./Components/Payments/Payments";
import SideNav from "./Components/SideNav/SideNav";

function App() {
  return (
    <div className="App">
      <SideNav />
      <div className="App-main">
        <Header />
        <Payments />
      </div>
    </div>
  );
}

export default App;
