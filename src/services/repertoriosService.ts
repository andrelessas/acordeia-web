import api from './api';
import { 
  Repertorio, 
  RepertorioComMusicas, 
  CriarRepertorioDto, 
  AtualizarRepertorioDto,
  AdicionarMusicaDto
} from '../types/repertorio';

// Flag para desenvolvimento com dados mockados
const USE_MOCK_DATA = false;

// Dados mockados para desenvolvimento
const mockRepertorios: RepertorioComMusicas[] = [
  {
    id: '1',
    nome: 'Show Acústico',
    musicas: [
      { id: '1', titulo: 'Como é Grande o Meu Amor Por Você', artista: 'Roberto Carlos', tomOriginal: 'G', tomTransposto: 'G', ordem: 1 },
      { id: '2', titulo: 'Evidências', artista: 'Chitãozinho & Xororó', tomOriginal: 'D', tomTransposto: 'D', ordem: 2 },
      { id: '3', titulo: 'Eduardo e Mônica', artista: 'Legião Urbana', tomOriginal: 'C', tomTransposto: 'C', ordem: 3 },
    ],
    publicado: false,
    usuarioId: '1',
    nomeUsuario: 'Usuario Teste',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    quantidadeMusicas: 3,
  },
  {
    id: '2',
    nome: 'Louvores Clássicos',
    musicas: [
      { id: '1', titulo: 'Como é Grande o Meu Amor Por Você', artista: 'Roberto Carlos', tomOriginal: 'G', tomTransposto: 'G', ordem: 1 },
      { id: '4', titulo: 'Fico Assim Sem Você', artista: 'Claudinho e Buchecha', tomOriginal: 'A', tomTransposto: 'A', ordem: 2 },
    ],
    publicado: true,
    usuarioId: '1',
    nomeUsuario: 'Usuario Teste',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    quantidadeMusicas: 2,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const repertoriosService = {
  async listarRepertorios(): Promise<Repertorio[]> {
    if (USE_MOCK_DATA) {
      await delay(300);
      // Retornar repertórios sem as músicas (apenas quantidadeMusicas)
      return mockRepertorios.map(({ musicas, ...rest }) => rest);
    }

    console.log('📝 Buscando repertórios...');
    const response = await api.get<Repertorio[]>('/Repertorios');
    console.log('✅ Repertórios carregados:', response.data);
    return response.data;
  },

  async obterRepertorio(id: string): Promise<RepertorioComMusicas> {
    if (USE_MOCK_DATA) {
      await delay(300);
      const repertorio = mockRepertorios.find(r => r.id === id);
      if (!repertorio) throw new Error('Repertório não encontrado');
      return repertorio;
    }

    console.log('📝 Buscando repertório:', id);
    const response = await api.get<RepertorioComMusicas>(`/Repertorios/${id}`);
    console.log('✅ Repertório carregado:', response.data);
    return response.data;
  },

  async criarRepertorio(dados: CriarRepertorioDto): Promise<Repertorio> {
    if (USE_MOCK_DATA) {
      await delay(400);
      const novoRepertorio: Repertorio = {
        id: String(mockRepertorios.length + 1),
        nome: dados.nome,
        quantidadeMusicas: dados.musicasIds.length,
        publicado: false,
        usuarioId: '1',
        nomeUsuario: 'Usuario Teste',
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };
      return novoRepertorio;
    }

    console.log('📤 Enviando requisição para criar repertório:', dados);
    const response = await api.post<Repertorio>('/Repertorios', dados);
    console.log('✅ Repertório criado:', response.data);
    return response.data;
  },

  async atualizarRepertorio(id: string, dados: AtualizarRepertorioDto): Promise<Repertorio> {
    if (USE_MOCK_DATA) {
      await delay(400);
      const repertorio = mockRepertorios.find(r => r.id === id);
      if (!repertorio) throw new Error('Repertório não encontrado');
      
      return {
        id: repertorio.id,
        nome: dados.nome || repertorio.nome,
        quantidadeMusicas: dados.musicasIds?.length || repertorio.quantidadeMusicas,
        publicado: dados.publicado !== undefined ? dados.publicado : repertorio.publicado,
        usuarioId: repertorio.usuarioId,
        nomeUsuario: repertorio.nomeUsuario,
        criadoEm: repertorio.criadoEm,
        atualizadoEm: new Date().toISOString(),
      };
    }

    console.log('📤 Enviando requisição para atualizar repertório:', dados);
    const response = await api.put<Repertorio>(`/Repertorios/${id}`, dados);
    console.log('✅ Repertório atualizado:', response.data);
    return response.data;
  },

  async excluirRepertorio(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(300);
      return;
    }

    console.log('🗑️ Excluindo repertório:', id);
    await api.delete(`/Repertorios/${id}`);
    console.log('✅ Repertório excluído');
  },

  async adicionarMusica(repertorioId: string, dados: AdicionarMusicaDto): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(300);
      return;
    }

    console.log('➕ Adicionando música ao repertório:', repertorioId, dados);
    await api.post(`/Repertorios/${repertorioId}/musicas`, dados);
    console.log('✅ Música adicionada');
  },

  async removerMusica(repertorioId: string, musicaId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(300);
      return;
    }

    console.log('➖ Removendo música do repertório:', repertorioId, musicaId);
    await api.delete(`/Repertorios/${repertorioId}/musicas/${musicaId}`);
    console.log('✅ Música removida');
  },

  async atualizarTomMusica(repertorioId: string, musicaId: string, tom: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(300);
      return;
    }

    console.log('🎵 Atualizando tom da música:', { repertorioId, musicaId, tom });
    await api.patch(`/Repertorios/${repertorioId}/musicas/${musicaId}/tom`, { tom });
    console.log('✅ Tom atualizado');
  },
};
