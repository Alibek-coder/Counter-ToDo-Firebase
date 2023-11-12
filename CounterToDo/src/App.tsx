import { Provider } from 'react-redux'
import './App.css'
import { Counter } from './components/Counter/Counter'
import { store } from './Redux/store'
import { ToDo } from './components/ToDo/ToDo'
import { NavLink, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Provider store={store}>
        <header>
          <div><NavLink to='/' style={({ isActive }) => ({ color: isActive ? 'gold' : 'white' })}> <h2>Counter</h2> </NavLink></div>
          <div><NavLink to='/todo' style={({ isActive }) => ({ color: isActive ? 'gold' : 'white' })}> <h2>ToDo</h2> </NavLink></div>
        </header>
        <div className="main">
          <Routes>
            <Route path='/' element={<Counter />} />
            <Route path='/todo' element={<ToDo />} />
          </Routes>
        </div>
      </Provider>
    </>
  )
}

export default App
