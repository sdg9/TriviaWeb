/**
 *
 * Asynchronously loads the component for ProjectorPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
