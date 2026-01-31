import { Modal } from '../comum/Modal';
import './ModalTransposicao.css';

const TONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface Props {
  tomAtual: string;
  tomOriginal: string;
  onSelecionar: (tom: string) => void;
  onFechar: () => void;
}

export function ModalTransposicao({ tomAtual, tomOriginal, onSelecionar, onFechar }: Props) {
  return (
    <Modal onFechar={onFechar} titulo="Selecionar Tom">
      <div className="modal-transposicao">
        <p className="modal-info">
          Tom original: <strong>{tomOriginal}</strong>
        </p>

        <div className="tons-grid">
          {TONS.map((tom) => (
            <button
              key={tom}
              onClick={() => onSelecionar(tom)}
              className={`btn-tom-opcao ${tom === tomAtual ? 'ativo' : ''}`}
            >
              {tom}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
