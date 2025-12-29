import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

import routes from './routes';

import { AuthProvider } from '@/contexts/AuthContext';
import { RouteGuard } from '@/components/common/RouteGuard';
import { Toaster } from '@/components/ui/toaster';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <RouteGuard>
          <IntersectObserver />
          <div className="flex flex-col min-h-screen">
            <Routes>
              {routes.map((route, index) => {
                // Check if route has children (nested routes like admin)
                if (route.children) {
                  return (
                    <Route key={index} path={route.path} element={route.element}>
                      {route.children.map((child, childIndex) => (
                        <Route
                          key={childIndex}
                          path={child.path}
                          element={child.element}
                        />
                      ))}
                    </Route>
                  );
                }
                
                // Regular routes with Header and Footer
                if (route.path === '/login') {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  );
                }
                
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          {route.element}
                        </main>
                        <Footer />
                      </>
                    }
                  />
                );
              })}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Toaster />
        </RouteGuard>
      </AuthProvider>
    </Router>
  );
};

export default App;
