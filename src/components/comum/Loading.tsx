import './Loading.css';

export function Loading() {
  return (
    <div className="loading-container" role="status" aria-label="Carregando">
      <div className="loading-spinner"></div>
    </div>
  );
}
