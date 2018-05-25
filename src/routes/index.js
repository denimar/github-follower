import Home from './Home'
import RepositoryView from './RepositoryView'
import UserView from './UserView'

export default {
  indexRoute  : Home,
  childRoutes : [
    {
      path: '/repositories',
      component : RepositoryView
    },
    {
      path: '/users',
      component : UserView
    }    
  ]
}
