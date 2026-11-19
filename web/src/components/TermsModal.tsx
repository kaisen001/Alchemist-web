"use client";

import { useLocale } from "@/lib/locale";

type Props = {
  open: boolean;
  onAccept: () => void;
  onClose: () => void;
};

export function TermsModal({ open, onAccept, onClose }: Props) {
  const { t } = useLocale();
  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="terms-title">
      <button type="button" className="modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="modal__panel">
        <h2 id="terms-title" className="modal__title">
          {t.terms.title}
        </h2>
        <div className="modal__body">
          {t.terms.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            {t.terms.decline}
          </button>
          <button type="button" className="btn btn--primary" onClick={onAccept}>
            {t.terms.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
