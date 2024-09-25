import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className='p-5 h-screen w-screen bg-slate-200'>
      <Router>
        <nav className='bg-white p-5 rounded-xl'>
          <h1 className='text-slate-500 text-center font-semibold text-2xl'>Supabase | React JS</h1>
          <div className='flex items-center justify-center gap-5 mt-5'>
            <Link to='/' className="px-2 py-1 rounded-md text-white bg-sky-500">Home</Link>
            <Link to='/create' className="px-2 py-1 rounded-md text-white bg-indigo-500">Create Something New</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
