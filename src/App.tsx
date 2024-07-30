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
import { paths } from './utils/paths';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={paths.home} element={<QuizSettings />} />
      <Route path={paths.main} element={<MainQuizScreen />} />
      <Route path={paths.results} element={<QuizResults />} />
      <Route path={paths.stats} element={<Statistics />} />
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
