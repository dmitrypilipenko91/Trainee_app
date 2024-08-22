import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { paths } from '../utils/paths';
import QuizSettings from '../pages/QuizSettings';
import MainQuizScreen from '../pages/MainQuizScreen';
import QuizResults from '../pages/QuizResults';
import Statistics from '../pages/Statistics';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={paths.home} element={<QuizSettings />} />
      <Route path={paths.main} element={<MainQuizScreen />} />
      <Route path={paths.results} element={<QuizResults />} />
      <Route path={paths.stats} element={<Statistics />} />
    </>,
  ),
);
