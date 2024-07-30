import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import QuizResults from './pages/QuizResults';
import QuizSettings from './pages/QuizSettings';
import MainQuizScreen from './pages/MainQuizScreen';
import Statistics from './pages/Statistics';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<QuizSettings />} />
      <Route path="main" element={<MainQuizScreen />} />
      <Route path="results" element={<QuizResults />} />
      <Route path="stats" element={<Statistics />} />
    </>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
