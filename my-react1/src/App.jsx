import { BrowserRouter,Routes, Route } from "react-router-dom";
import Top from "./pages/Top";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Article from "./pages/Article";
import WordList from "./pages/WordList";
import User from "./pages/User";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/wordlist" element={<WordList />} />
        <Route path="/user" element={<User />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
