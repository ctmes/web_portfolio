import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import ProjectDetail from "./components/sections/ProjectDetail";
import AdminMessages from "./components/sections/AdminMessages";
import Login from "./components/sections/Login";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./lib/auth";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import routes from "tempo-routes";
import { ThemeProvider } from "./lib/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute>
                    <AdminMessages />
                  </ProtectedRoute>
                }
              />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            <Toaster />
          </>
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
