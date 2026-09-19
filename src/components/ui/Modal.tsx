import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ onClose, children, className = '' }: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal ${className}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}
