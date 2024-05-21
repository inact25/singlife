import { RouteObject } from 'react-router-dom'
import Introduction from '@pages/introduction'
import Dream from '@pages/dreams'
import Question from '@pages/question'
import YourDream from '@pages/your-dream'
import SamplePopup from '@pages/sample-popup'
import QuestionFinish from '@pages/question-finish'
import Detector from '@pages/detector'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Introduction />,
  },
  {
    path: '/dreams',
    element: <Dream />,
  },
  {
    path: '/questions',
    element: <Question />,
  },
  {
    path: '/question/finish/:id',
    element: <QuestionFinish />,
  },
  {
    path: '/your-dream/:id',
    element: <YourDream />,
  },
  {
    path: 'sample',
    element: <SamplePopup />,
  },
  {
    path: 'tracking/:purpose',
    element: <Detector />,
  },
  {
    path: 'share/:purpose',
    element: <Detector />,
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
]

export default routes
