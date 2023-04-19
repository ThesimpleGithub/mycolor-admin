import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import FilterListContainer from './components/FilterListContainer';
import axios from 'axios';
import { createContext } from 'react';
import { ICategory } from './interfaces/filter';
import { Route, Routes } from 'react-router-dom';
import FilterForm from './components/FilterForm';
import IsLogedIn from './components/IsLogedIn';
const initialCategory: ICategory = {
  seasons: [{ colorID: 1, colorNameKor: '' }],
  filterTypes: [{ filterTypeID: 1, name: '' }],
};
export const CategoryContext = createContext(initialCategory);

function App() {
  const [category, setCategory] = useState(initialCategory);
  const fetchCategory = async () => {
    const data = (
      await axios.get('/api/getCategory', {
        headers: {
          'Cache-Control': 'max-age=0',
        },
      })
    ).data;
    setCategory(data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <CategoryContext.Provider value={category}>
      <Routes>
        <Route
          path="/"
          element={
            <IsLogedIn>
              <FilterListContainer />
            </IsLogedIn>
          }
        />
        <Route
          path="/form"
          element={
            <IsLogedIn>
              <FilterForm />
            </IsLogedIn>
          }
        />
      </Routes>
    </CategoryContext.Provider>
  );
}
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7000'
    : 'https://mycolor.thesimple.synology.me';

export default App;
