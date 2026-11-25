import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Award,
  Calendar,
  User,
  Hash,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { EASE_LUXURY } from './motionPresets';

export function CertificateModal({
  certificate,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) {
  useEffect(() => {
    if (!certificate) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="cert-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <motion.div
            className="cert-modal-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, ease: EASE_LUXURY }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-topbar">
              <div className="cert-modal-counter font-mono">
                Certificate {currentIndex + 1} of {totalCount}
              </div>

              <div className="cert-modal-nav">
                <motion.button
                  type="button"
                  onClick={onPrev}
                  className="cert-modal-icon-btn"
                  aria-label="Previous certificate"
                  title="Previous certificate"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onNext}
                  className="cert-modal-icon-btn"
                  aria-label="Next certificate"
                  title="Next certificate"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <ChevronRight size={18} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="cert-modal-icon-btn cert-modal-close"
                  aria-label="Close certificate view"
                  title="Close (Esc)"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.22, ease: EASE_LUXURY }}
                className={`cert-sheet cert-sheet--${certificate.accent || 'blue'}`}
              >
                <div className="cert-sheet-corner cert-sheet-corner--tl" aria-hidden="true" />
                <div className="cert-sheet-corner cert-sheet-corner--br" aria-hidden="true" />

                <div className="cert-sheet-header">
                  <div className="cert-sheet-issuer-block">
                    <span className="cert-sheet-seal" aria-hidden="true">
                      <Award size={24} />
                    </span>
                    <div>
                      <p className="cert-sheet-issuer">{certificate.issuer}</p>
                      <p className="cert-sheet-org">{certificate.organization}</p>
                    </div>
                  </div>
                  <span className="cert-sheet-badge">{certificate.badge}</span>
                </div>

                <div className="cert-sheet-body">
                  <p className="cert-sheet-kicker">Official Certification Record</p>
                  <h3 id="cert-modal-title" className="cert-sheet-title">
                    {certificate.title}
                  </h3>
                  <p className="cert-sheet-subtitle">{certificate.shortTitle}</p>
                  <p className="cert-sheet-desc">{certificate.description}</p>

                  {certificate.scoreSummary && (
                    <div className="cert-sheet-score-box">
                      <CheckCircle2 size={17} aria-hidden="true" />
                      <span>{certificate.scoreSummary}</span>
                    </div>
                  )}
                </div>

                <div className="cert-sheet-meta-grid">
                  <div className="cert-sheet-meta-item">
                    <span className="cert-sheet-meta-label">
                      <User size={13} />
                      <span>Awarded To</span>
                    </span>
                    <strong className="cert-sheet-meta-val">{certificate.recipient}</strong>
                  </div>

                  <div className="cert-sheet-meta-item">
                    <span className="cert-sheet-meta-label">
                      <Calendar size={13} />
                      <span>Issue / Completion Date</span>
                    </span>
                    <strong className="cert-sheet-meta-val">{certificate.issueDate}</strong>
                  </div>

                  <div className="cert-sheet-meta-item">
                    <span className="cert-sheet-meta-label">
                      <Hash size={13} />
                      <span>Credential / Roll ID</span>
                    </span>
                    <strong className="cert-sheet-meta-val font-mono">
                      {certificate.credentialId}
                    </strong>
                  </div>

                  {certificate.signatory && (
                    <div className="cert-sheet-meta-item">
                      <span className="cert-sheet-meta-label">
                        <Building2 size={13} />
                        <span>Authorized Signatory</span>
                      </span>
                      <strong className="cert-sheet-meta-val">{certificate.signatory}</strong>
                    </div>
                  )}
                </div>

                {certificate.verifyUrl && (
                  <div className="cert-sheet-actions">
                    <motion.a
                      href={certificate.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sheen"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>Verify Official Credential</span>
                      <ExternalLink size={15} />
                    </motion.a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
