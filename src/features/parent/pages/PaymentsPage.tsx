import { ArrowRight, Check, CircleDollarSign, Clock3, Download, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../app/providers';
import { useBookingEligibility } from '../hooks/useBookingEligibility';
import { dataClient } from '../../../lib/data/client';
import { TERM_BASE_PRICE, REGISTRATION_FEE, GST_RATE, TERM_CREDITS } from '../../../lib/config';

const subtotal = TERM_BASE_PRICE + REGISTRATION_FEE;
const gst = Math.round(subtotal * GST_RATE);
const total = subtotal + gst;

interface IndividualClassDetails {
  subject: string;
  day: string;
  time: string;
  tutor: string;
  child: string;
  amount: number;
}

export function PaymentsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { familyId } = useAuth();
  const { gatingState, activeTerm, isLoading } = useBookingEligibility(familyId);

  // Detect if we arrived here from BookClassPage for an individual class payment
  const locationState = location.state as { type?: string; classDetails?: IndividualClassDetails } | null;
  const isIndividualFlow = locationState?.type === 'individual';
  const classDetails = locationState?.classDetails;

  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const FAMILY_NAMES: Record<string, string> = { f1: 'Sarah Johnson', f2: 'Claire Brown', f3: 'James Taylor', f4: 'Michael Chen' };
  const familyName = FAMILY_NAMES[familyId] ?? familyId;

  async function submitTermPayment() {
    await dataClient.submitPayment({
      family_id: familyId, family_name: familyName, type: 'term',
      amount: subtotal, gst, status: 'pending',
      reference: `TERM-${familyId.toUpperCase()}`,
      term_label: 'Term 3, 2025',
      receipt_filename: uploadedFile ?? undefined,
    });
    setSubmitted(true);
  }

  async function submitIndividualPayment() {
    if (!classDetails) return;
    const classGst = Math.round(classDetails.amount * GST_RATE);
    await dataClient.submitPayment({
      family_id: familyId, family_name: familyName, type: 'individual_class',
      amount: classDetails.amount, gst: classGst, status: 'pending',
      reference: `CLASS-${classDetails.child.split(' ')[0].toUpperCase()}-${classDetails.subject.slice(0, 4).toUpperCase()}`,
      child_name: classDetails.child,
      class_subject: classDetails.subject, class_day: classDetails.day,
      class_time: classDetails.time, class_tutor: classDetails.tutor,
      receipt_filename: uploadedFile ?? undefined,
    });
    setSubmitted(true);
  }

  if (isLoading) return <div className="page-stack"><p>Loading...</p></div>;

  // ── Individual class payment flow ─────────────────────────────────────────────
  if (isIndividualFlow && classDetails) {
    const classGst = Math.round(classDetails.amount * GST_RATE);
    const classTotal = classDetails.amount + classGst;

    if (submitted) {
      return (
        <div className="page-stack">
          <div className="payment-highlight pending">
            <div>
              <span className="label">Individual class payment</span>
              <h2>Payment pending verification</h2>
              <p>We'll confirm {classDetails.child.split(' ')[0]}'s booking once we've verified your transfer.</p>
            </div>
            <div className="payment-total">
              <span className="pending-text">PENDING</span>
              <strong>${classTotal}</strong>
              <small>AUD · 1 class</small>
            </div>
          </div>
          <div className="card invoice">
            <div className="invoice-head">
              <div><span className="label">Individual class</span><h3>{classDetails.subject}</h3></div>
              <span className="status pending"><Clock3 size={13} />Pending</span>
            </div>
            <div className="review-details" style={{ marginBottom: 0 }}>
              <div className="review-detail-row"><span>Child</span><b>{classDetails.child}</b></div>
              <div className="review-detail-row"><span>Day</span><b>{classDetails.day}</b></div>
              <div className="review-detail-row"><span>Time</span><b>{classDetails.time}</b></div>
              <div className="review-detail-row"><span>Tutor</span><b>{classDetails.tutor}</b></div>
            </div>
            <div className="divider" />
            <div className="invoice-line"><span>Class fee</span><b>${classDetails.amount}.00</b></div>
            <div className="invoice-line"><span>GST (10%)</span><b>${classGst}.00</b></div>
            <div className="divider" />
            <div className="invoice-line total"><span>Total</span><b>${classTotal}.00 AUD</b></div>
            <div className="pending-verify-note">
              <Clock3 size={18} />
              <span>Booking will be confirmed once your payment is verified — usually within 1–2 business days.</span>
            </div>
            <div className="invoice-actions">
              <Button onClick={() => navigate('/parent/bookings')} icon={ArrowRight}>View my bookings</Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="page-stack">
        <div className="payment-highlight">
          <div>
            <span className="label">Individual class · {classDetails.child}</span>
            <h2>{classDetails.subject}</h2>
            <p>{classDetails.day} · {classDetails.time} · {classDetails.tutor}</p>
          </div>
          <div className="payment-total">
            <span>TOTAL DUE</span>
            <strong>${classTotal}</strong>
            <small>AUD · 1 class</small>
          </div>
        </div>

        <div className="card invoice">
          <div className="invoice-head">
            <div><span className="label">Invoice</span><h3>Individual class booking</h3></div>
          </div>

          {step === 1 && (
            <>
              <div className="review-details" style={{ marginBottom: 16 }}>
                <div className="review-detail-row"><span>Child</span><b>{classDetails.child}</b></div>
                <div className="review-detail-row"><span>Subject</span><b>{classDetails.subject}</b></div>
                <div className="review-detail-row"><span>Day</span><b>{classDetails.day}</b></div>
                <div className="review-detail-row"><span>Time</span><b>{classDetails.time}</b></div>
                <div className="review-detail-row"><span>Tutor</span><b>{classDetails.tutor}</b></div>
              </div>
              <div className="invoice-line"><span>Class fee</span><b>${classDetails.amount}.00</b></div>
              <div className="invoice-line"><span>GST (10%)</span><b>${classGst}.00</b></div>
              <div className="divider" />
              <div className="invoice-line total"><span>Total due</span><b>${classTotal}.00 AUD</b></div>
              <div className="bank-details-card">
                <div className="bank-details-head"><CircleDollarSign size={18} /><span>Bank transfer details</span></div>
                <div className="bank-detail-row"><span>Account name</span><b>Fairybread &amp; Fractions Tutoring</b></div>
                <div className="bank-detail-row"><span>BSB</span><b>062 000</b></div>
                <div className="bank-detail-row"><span>Account number</span><b>1234 5678</b></div>
                <div className="bank-detail-row"><span>Reference</span><b>CLASS-{classDetails.child.split(' ')[0].toUpperCase()}-{classDetails.subject.slice(0, 4).toUpperCase()}</b></div>
              </div>
              <div className="invoice-actions">
                <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
                <Button onClick={() => setStep(2)} icon={Check}>I've made this payment</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <span className="label">Upload proof of payment</span>
              <h3>Share your receipt</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
                Upload a screenshot or PDF of your bank transfer confirmation.
              </p>
              {!uploadedFile ? (
                <div className="upload-area" onClick={() => setUploadedFile('class-payment-receipt.jpg')}>
                  <Upload size={28} /><strong>Drag &amp; drop or click to upload</strong><span>JPG, PNG or PDF · up to 10MB</span>
                </div>
              ) : (
                <div className="upload-attached">
                  <div className="upload-file-info">
                    <FileText size={20} />
                    <div><strong>{uploadedFile}</strong><span>Attached · ready to submit</span></div>
                    <Check size={18} className="teal-text" />
                  </div>
                  <button className="upload-remove" onClick={() => setUploadedFile(null)}>Remove file</button>
                </div>
              )}
              <div className="form-actions">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button disabled={!uploadedFile} onClick={submitIndividualPayment} icon={ArrowRight}>Submit proof</Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Pending verification state ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="page-stack">
        <div className="payment-highlight pending">
          <div>
            <span className="label">Term payment</span>
            <h2>Payment pending verification</h2>
            <p>We'll unlock your class bookings once we've confirmed your transfer.</p>
          </div>
          <div className="payment-total">
            <span className="pending-text">PENDING</span>
            <strong>${total}</strong>
            <small>AUD · {TERM_CREDITS}-week term</small>
          </div>
        </div>
        <div className="card invoice">
          <div className="invoice-head">
            <div><span className="label">Term payment</span><h3>10-week term package</h3></div>
            <span className="status pending"><Clock3 size={13} />Pending</span>
          </div>
          <div className="invoice-line"><span>10-week term ({TERM_CREDITS} class credits)</span><b>${TERM_BASE_PRICE}</b></div>
          <div className="invoice-line"><span>Registration fee</span><b>${REGISTRATION_FEE}</b></div>
          <div className="divider" />
          <div className="invoice-line total"><span>Total</span><b>${total}</b></div>
          <div className="pending-verify-note">
            <Clock3 size={18} />
            <span>Class booking will unlock once your payment is verified — usually within 1–2 business days.</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Active term — already paid ──────────────────────────────────────────────
  if (gatingState === 'ACTIVE_TERM' && activeTerm?.payment?.status === 'paid') {
    return (
      <div className="page-stack">
        <div className="payment-highlight">
          <div>
            <span className="label">Current term</span>
            <h2>Payment complete</h2>
            <p>Your class bookings are unlocked. {activeTerm.classes_remaining} of {activeTerm.classes_included} credits remaining.</p>
          </div>
          <div className="payment-total">
            <span>PAID</span>
            <strong>${total}</strong>
            <small>AUD · {TERM_CREDITS}-week term</small>
          </div>
        </div>
        <div className="card invoice">
          <div className="invoice-head">
            <div><span className="label">Invoice #FF-2025-031</span><h3>10-week term package</h3></div>
            <span className="status confirmed"><Check size={13} />Paid</span>
          </div>
          <div className="invoice-line"><span>10-week term ({TERM_CREDITS} class credits)</span><b>${TERM_BASE_PRICE}</b><small>Paid</small></div>
          <div className="invoice-line"><span>Registration fee</span><b>${REGISTRATION_FEE}</b><small>Paid</small></div>
          <div className="divider" />
          <div className="invoice-line"><span>Subtotal</span><b>${subtotal}</b></div>
          <div className="invoice-line"><span>GST (10%)</span><b>${gst}</b></div>
          <div className="divider" />
          <div className="invoice-line total"><span>Total paid</span><b>${total}</b></div>
          <div className="invoice-actions">
            <Button variant="soft" icon={Download}>Download receipt</Button>
            <Button onClick={() => navigate('/parent/book-class')} icon={ArrowRight}>Book classes</Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Purchase flow — NO_TERM_EVER or TERM_EXPIRED ────────────────────────────
  const isRenewal = gatingState === 'TERM_EXPIRED';

  return (
    <div className="page-stack">
      {/* Hero — explains what they're purchasing and why */}
      <div className="payment-highlight">
        <div>
          <span className="label">{isRenewal ? 'Renew your term' : 'Purchase your first term'}</span>
          <h2>{isRenewal ? 'Ready for another term?' : 'Unlock your class bookings'}</h2>
          <p>
            {isRenewal
              ? 'Purchase a new 10-week term to continue booking regular classes.'
              : 'Pay for a 10-week term upfront to get 10 class credits. Book your classes any time during the term.'}
          </p>
        </div>
        <div className="payment-total">
          <span>TOTAL DUE</span>
          <strong>${total}</strong>
          <small>AUD · {TERM_CREDITS} classes included</small>
        </div>
      </div>

      {/* What's included — only shown for new families */}
      {!isRenewal && (
        <div className="card" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: '📅', title: '10-week term', desc: 'One term runs for 10 calendar weeks from your start date.' },
            { icon: '🎟️', title: '10 class credits', desc: 'Book any class, any subject, any tutor — 1 credit per session.' },
            { icon: '👨‍👩‍👧', title: 'Whole family', desc: 'Credits are shared across all your children — not per child.' },
            { icon: '➕', title: 'Extra classes', desc: 'Used all 10? Book individual classes at $50 each.' },
          ].map(item => (
            <div key={item.title} style={{ flex: '1 1 180px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <strong style={{ fontSize: 13 }}>{item.title}</strong>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: '4px 0 0' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      <div className="card invoice">
        <div className="invoice-head">
          <div><span className="label">Invoice</span><h3>10-week term package</h3></div>
        </div>

        {/* Step 1 — Invoice + bank details */}
        {step === 1 && (
          <>
            <div className="invoice-line"><span>10-week term ({TERM_CREDITS} class credits)</span><b>${TERM_BASE_PRICE}</b></div>
            <div className="invoice-line"><span>Registration fee</span><b>${REGISTRATION_FEE}</b></div>
            <div className="divider" />
            <div className="invoice-line"><span>Subtotal</span><b>${subtotal}</b></div>
            <div className="invoice-line"><span>GST (10%)</span><b>${gst}</b></div>
            <div className="divider" />
            <div className="invoice-line total"><span>Total due</span><b>${total}</b></div>
            <div className="bank-details-card">
              <div className="bank-details-head"><CircleDollarSign size={18} /><span>Bank transfer details</span></div>
              <div className="bank-detail-row"><span>Account name</span><b>Fairybread &amp; Fractions Tutoring</b></div>
              <div className="bank-detail-row"><span>BSB</span><b>062 000</b></div>
              <div className="bank-detail-row"><span>Account number</span><b>1234 5678</b></div>
              <div className="bank-detail-row"><span>Reference</span><b>TERM-{familyId.toUpperCase()}</b></div>
            </div>
            <div className="invoice-actions">
              <Button variant="soft" icon={Download}>Download invoice</Button>
              <Button onClick={() => setStep(2)} icon={Check}>I've made this payment</Button>
            </div>
          </>
        )}

        {/* Step 2 — Upload proof */}
        {step === 2 && (
          <>
            <span className="label">Upload proof of payment</span>
            <h3>Share your receipt</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
              Upload a screenshot or PDF of your bank transfer confirmation.
            </p>
            {!uploadedFile ? (
              <div className="upload-area" onClick={() => setUploadedFile('term-payment-receipt.jpg')}>
                <Upload size={28} /><strong>Drag &amp; drop or click to upload</strong><span>JPG, PNG or PDF · up to 10MB</span>
              </div>
            ) : (
              <div className="upload-attached">
                <div className="upload-file-info">
                  <FileText size={20} />
                  <div><strong>{uploadedFile}</strong><span>Attached · ready to submit</span></div>
                  <Check size={18} className="teal-text" />
                </div>
                <button className="upload-remove" onClick={() => setUploadedFile(null)}>Remove file</button>
              </div>
            )}
            <div className="form-actions">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button disabled={!uploadedFile} onClick={submitTermPayment} icon={ArrowRight}>Submit proof</Button>
            </div>
          </>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <>
            <div className="pending-verify-card">
              <div className="pending-verify-icon"><Clock3 size={32} /></div>
              <h3>Payment submitted</h3>
              <p>
                Thank you! We've received your proof of payment and will verify it within 1–2 business days.
                Your class bookings will unlock as soon as we confirm.
              </p>
              <div className="pending-verify-detail">
                <div className="pending-detail-row"><span>Amount</span><b>${total}.00 AUD</b></div>
                <div className="pending-detail-row"><span>Includes</span><b>{TERM_CREDITS} class credits</b></div>
                <div className="pending-detail-row"><span>Status</span><b className="pending-badge">Pending verification</b></div>
              </div>
              <div className="pending-booking-note">
                <Clock3 size={16} /> Class booking unlocks once payment is verified.
              </div>
            </div>
            <div className="form-actions">
              <Button onClick={() => setSubmitted(true)} icon={ArrowRight}>Back to payments</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
