import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authProtectedRoutes, publicRoutes } from './allRoutes';
import Layout from 'Layout';
import NonAuthLayout from "Layout/NonLayout"
import AuthProtected from './AuthProtected';
import Pages404 from 'pages/AuthenticationInner/Pages404';

const RouteIndex = () => {
  return (
    <React.Fragment>
      <Routes>
        {authProtectedRoutes.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AuthProtected>
                <Layout>
                  <route.component />
                </Layout>
              </AuthProtected>
            }
          />
        ))}
        {publicRoutes.map((route: any, idx: number) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <NonAuthLayout>
                <route.component />
              </NonAuthLayout>
            } />
        ))}
        <Route path="*" element={<Pages404 />} />
      </Routes>
    </React.Fragment>
  );
};

export default RouteIndex;
