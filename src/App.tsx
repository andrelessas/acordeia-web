import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { DetalheMusicaPage } from './pages/DetalheMusicaPage';
import { CadastroMusicaPage } from './pages/CadastroMusicaPage';
import { EditarMusicaPage } from './pages/EditarMusicaPage';
import { FavoritosPage } from './pages/FavoritosPage';
import { ModoPalcoPage } from './pages/ModoPalcoPage';
import { RepertoriosPage } from './pages/RepertoriosPage';
import { CriarRepertorioPage } from './pages/CriarRepertorioPage';
import { EditarRepertorioPage } from './pages/EditarRepertorioPage';
import { VisualizarRepertorioPage } from './pages/VisualizarRepertorioPage';
import { Loading } from './components/comum/Loading';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <Loading />;
  if (!usuario) {
    // Salvar a rota que o usuário tentou acessar
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas públicas com Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/musica/:id" element={<DetalheMusicaPage />} />
            <Route path="/modo-palco/:id" element={<ModoPalcoPage />} />
          </Route>

          {/* Rotas protegidas com Layout */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/cadastrar-musica" element={<CadastroMusicaPage />} />
            <Route path="/editar-musica/:id" element={<EditarMusicaPage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
            <Route path="/repertorios" element={<RepertoriosPage />} />
            <Route path="/repertorios/novo" element={<CriarRepertorioPage />} />
            <Route path="/repertorios/:id/editar" element={<EditarRepertorioPage />} />
            <Route path="/repertorios/:id" element={<VisualizarRepertorioPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
