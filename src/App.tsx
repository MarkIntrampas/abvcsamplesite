import { BrowserRouter, Routes, Route} from "react-router-dom"
import About from './Pages/Pages/About'
import Home from './Pages/Pages/Home'
import Blogs from './Pages/Pages/Blogs'
import Contact from './Pages/Pages/Contact'
import "./App.css"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/contact" element={<Contact />}></Route>         
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
