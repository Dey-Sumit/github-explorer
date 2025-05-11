import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import RepositoryDetail from './components/pages/repository-detail.page';
import RepositoryList from './components/pages/repository-list.page';
import RepositoryNew from './components/pages/repository-new.page';

/**
 * Application routes configuration
 * Each route is defined with a path and corresponding component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RepositoryList} />
        <Route path="/new" component={RepositoryNew} />
        <Route path="/repository/:id" component={RepositoryDetail} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
