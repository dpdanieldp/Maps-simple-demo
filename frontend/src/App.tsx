import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar';
import PointsMap from './components/PointsMap/PointsMap';
import DirectionsMap from './components/DirectionsMap/DirectionsMap';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attemptIndex => Math.min(500 * 2 ** attemptIndex, 5000)
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route path="/" element={<PointsMap />} />
              <Route path="/directions" element={<DirectionsMap />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>

      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
