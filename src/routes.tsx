import React from 'react';
import {
  Route,
  Routes as RouterRoutes,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
// import RepositoryDetail from './components/pages/repository-detail.page';
// import RepositoryNew from './components/pages/repository-new.page';
import RepositoryList from './components/pages/repository-list.page';
import AppLayout from './components/layout/app-layout';

/**
 * Application routes configuration
 * Each route is defined with a path and corresponding component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <RouterRoutes>
          <Route path="/" element={<RepositoryList />} />
          {/* <Route path="/new" element={<RepositoryNew />} />
          <Route path="/repository/:name" element={<RepositoryDetail />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </RouterRoutes>
      </AppLayout>
    </Router>
  );
};

export default Routes;
