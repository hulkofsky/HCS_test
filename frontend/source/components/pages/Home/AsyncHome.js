import loadable from 'react-loadable'

// components
import Loader from '../../elements/Loader/index'

const AsyncHome = loadable({
  loader: () => import('./index'),
  loading: Loader
})

export default AsyncHome