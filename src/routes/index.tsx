import React from 'react';
import {
  Route,
  Routes as RouterRoutes,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import RepositoryNew from '../components/pages/repository-new.page';
import RepositoryList from '../components/pages/repository-list.page';
import AppLayout from '../components/layout/app-layout';
import RepositoryDetail from '../components/pages/repository-detail.page';
import { ROUTES } from './constants';

/**
 * Application routes configuration
 * Each route is defined with a path and corresponding component
 */
const RoutesWithLayout: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <RouterRoutes>
          <Route path={ROUTES.HOME} element={<RepositoryList />} />
          <Route path={ROUTES.REPOSITORY_NEW} element={<RepositoryNew />} />
          <Route
            path={ROUTES.REPOSITORY_DETAIL}
            element={<RepositoryDetail />}
          />
          <Route
            path={ROUTES.NOT_FOUND}
            element={<Navigate to={ROUTES.HOME} replace />}
          />
        </RouterRoutes>
      </AppLayout>
    </Router>
  );
};

export default RoutesWithLayout;
