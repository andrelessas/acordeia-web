import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { DetalheMusicaPage } from './pages/DetalheMusicaPage';
import { CadastroMusicaPage } from './pages/CadastroMusicaPage';
import { FavoritosPage } from './pages/FavoritosPage';
import { ModoPalcoPage } from './pages/ModoPalcoPage';
import { Loading } from './components/comum/Loading';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!usuario) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/musica/:id" element={<DetalheMusicaPage />} />
            <Route path="/cadastrar-musica" element={<CadastroMusicaPage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
          </Route>

          <Route path="/modo-palco/:id" element={
            <ProtectedRoute>
              <ModoPalcoPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
