import { useEffect, useRef } from 'react';

/**
 * Hook para manter a tela ativa usando Wake Lock API
 * Impede que a tela do dispositivo apague durante a visualização
 */
export function useWakeLock(enabled: boolean = true) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    // Verificar suporte do navegador
    if (!('wakeLock' in navigator)) {
      console.warn('Wake Lock API não suportada neste navegador');
      return;
    }

    const requestWakeLock = async () => {
      if (!enabled) return;

      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('Wake Lock ativado');

        // Listener para quando o wake lock é liberado (ex: troca de aba)
        wakeLockRef.current.addEventListener('release', () => {
          console.log('Wake Lock liberado');
        });
      } catch (err: any) {
        // Erro silencioso - não deve quebrar a aplicação
        console.warn('Erro ao ativar Wake Lock:', err.message);
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
          console.log('Wake Lock desativado');
        } catch (err: any) {
          console.warn('Erro ao liberar Wake Lock:', err.message);
        }
      }
    };

    // Ativar wake lock
    if (enabled) {
      requestWakeLock();
    }

    // Re-ativar quando a página volta a ficar visível
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup: liberar wake lock ao desmontar ou desabilitar
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseWakeLock();
    };
  }, [enabled]);

  return {
    supported: 'wakeLock' in navigator,
    active: wakeLockRef.current !== null,
  };
}
