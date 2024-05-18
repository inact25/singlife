import { RouteObject } from 'react-router-dom'
import Introduction from '@pages/introduction'
import Dream from '@pages/dreams'
import Question from '@pages/question'
import YourDream from '@pages/your-dream'
import Ar from '@pages/ar'
import SamplePopup from '@pages/sample-popup'

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
    path: '/your-dream/:id',
    element: <YourDream />,
  },
  {
    path: '/ar',
    element: <Ar />,
  },
  {
    path: 'sample',
    element: <SamplePopup />,
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
]

export default routes
