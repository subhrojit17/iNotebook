import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Kya re, bakwas fellow" />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/home" element={<Home />} />{" "}
              {/* Optional: add /home route to access Home */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
