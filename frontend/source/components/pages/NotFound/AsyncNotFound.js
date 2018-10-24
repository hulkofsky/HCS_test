import loadable from 'react-loadable'

// components
import Loader from '../../elements/Loader/index'

const AsyncNotFound = loadable({
  loader: () => import('./index'),
  loading: Loader
})

export default AsyncNotFound