import { RouteObject } from 'react-router-dom'
import Introduction from '@pages/introduction'
import Dream from '@pages/dreams'
import Question from '@pages/question'
import YourDream from '@pages/your-dream'

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
    path: '*',
    element: <h1>Not Found</h1>,
  },
]

export default routes
