import { useEffect } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  mensagem: string;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  duration?: number;
}

export function ErrorMessage({ 
  mensagem, 
  onDismiss, 
  autoDismiss = true, 
  duration = 5000 
}: ErrorMessageProps) {
  useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, duration, onDismiss]);

  if (!mensagem) return null;

  return (
    <div className="error-message" role="alert">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{mensagem}</span>
        {onDismiss && (
          <button 
            className="error-close" 
            onClick={onDismiss}
            aria-label="Fechar mensagem de erro"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
