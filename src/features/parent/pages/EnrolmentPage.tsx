import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../components/ui/Button';
import { Confetti } from '../../../components/ui/Sprinkles';
import { dataClient } from '../../../lib/data/client';
import { useAuth } from '../../../app/providers';

const steps = ['Parent', 'Child', 'Learning', 'Terms', 'Signature', 'Complete'];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SUBJECTS = ['Mathematics', 'English', 'Reading & Spelling', 'Maths & English'];
const TUTORS = ['No preference', 'Jessica Taylor', 'Sarah Wilson', 'Daniel Smith'];
const SESSION_OPTIONS = ['1 session per week', '2 sessions per week', '3 sessions per week'];
const REFERRAL_OPTIONS = ['Word of mouth', 'Google', 'Social media', 'School newsletter', 'Other'];

export function EnrolmentPage() {
  const navigate = useNavigate();
  const { familyId } = useAuth();
  const qc = useQueryClient();
  const [step, setStep] = useState(1);
  const [signature, setSignature] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Parent details
  const [parent, setParent] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    mobile: '0412 345 678',
    emergency: 'Michael Johnson · 0400 111 222',
  });

  // Child selection — fetched from real data
  const { data: children = [] } = useQuery({
    queryKey: ['children', familyId],
    queryFn: () => dataClient.getChildren(familyId),
  });
  const [selectedChildId, setSelectedChildId] = useState('');
  const selectedChild = children.find(c => c.id === selectedChildId) ?? null;

  // Learning preferences
  const [learning, setLearning] = useState({
    subjects: [] as string[],
    goals: '',
    days: [] as string[],
    notes: '',
  });

  // Term preferences
  const [prefs, setPrefs] = useState({
    tutor: 'No preference',
    sessions: '2 sessions per week',
    referral: 'Word of mouth',
  });

  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter(x => x !== item) : [...list, item];

  const firstName = selectedChild?.name.split(' ')[0] ?? 'your child';

  const canProceedStep2 = !!selectedChild;
  const canProceedStep3 = learning.subjects.length > 0 && learning.days.length > 0;
  const canProceedStep5 = agreedToTerms;
  const canComplete = signature.trim().length > 2;

  const completeEnrolment = () => {
    if (!selectedChild) return;
    const updated = {
      ...selectedChild,
      enrolled: true,
      subjects: learning.subjects,
      preferredDays: learning.days,
      goals: learning.goals,
      notes: learning.notes,
      preferredTutor: prefs.tutor,
      sessions: prefs.sessions,
    };
    dataClient.addChild(familyId, updated).then(() => {
      qc.invalidateQueries({ queryKey: ['children', familyId] });
    });
    setStep(6);
  };

  return (
    <div className="page-stack narrow-page">
      <div className="enrolment-head">
        <div className="eyebrow">A few lovely details</div>
        <h2>Let's make it official.</h2>
        <p>
          {selectedChild
            ? `We'll use these details to tailor ${firstName}'s learning experience.`
            : "We'll use these details to tailor your child's learning experience."}
        </p>
      </div>

      <div className="stepper">
        {steps.map((s, i) => (
          <div className={step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''} key={s}>
            <span>{step > i + 1 ? <Check size={14} /> : i + 1}</span>{s}
          </div>
        ))}
      </div>

      <div className="card form-card">

        {/* ── Step 1: Parent details ── */}
        {step === 1 && (
          <>
            <span className="label">Parent details</span>
            <h3>Tell us about you</h3>
            <div className="form-grid">
              <label>Full name<input value={parent.name} onChange={e => setParent({ ...parent, name: e.target.value })} placeholder="Your full name" /></label>
              <label>Email address<input type="email" value={parent.email} onChange={e => setParent({ ...parent, email: e.target.value })} placeholder="your@email.com" /></label>
              <label>Mobile number<input value={parent.mobile} onChange={e => setParent({ ...parent, mobile: e.target.value })} placeholder="04xx xxx xxx" /></label>
              <label>Emergency contact<input value={parent.emergency} onChange={e => setParent({ ...parent, emergency: e.target.value })} placeholder="Name · number" /></label>
            </div>
            <div className="form-actions">
              <span />
              <Button onClick={() => setStep(2)} icon={ArrowRight}>Continue</Button>
            </div>
          </>
        )}

        {/* ── Step 2: Child selection — fetched from My Children ── */}
        {step === 2 && (
          <>
            <span className="label">Child details</span>
            <h3>Who are we enrolling?</h3>
            <p className="step-intro">Select a child from your family account. Their details will be filled in automatically.</p>

            <div className="enrol-child-select">
              <label>Select child
                <select
                  value={selectedChildId}
                  onChange={e => setSelectedChildId(e.target.value)}
                >
                  <option value="">— Choose a child —</option>
                  {children.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>
            </div>

            {selectedChild && (
              <div className="enrol-child-preview">
                <div className="child-avatar large">{selectedChild.initials}</div>
                <div className="enrol-child-info">
                  <strong>{selectedChild.name}</strong>
                  <div className="form-grid" style={{ marginTop: 14 }}>
                    <label>Full name<input value={selectedChild.name} readOnly /></label>
                    <label>Year level<input value={selectedChild.year} readOnly /></label>
                    <label>School<input value={selectedChild.school} readOnly /></label>
                    <label>Date of birth<input placeholder="Not on file — add if needed" /></label>
                  </div>
                </div>
              </div>
            )}

            {!selectedChild && children.length === 0 && (
              <div className="enrol-no-children">
                <p>No children found on your account. Add a child first from <button className="text-link" onClick={() => navigate('/parent/children')}>My children</button>.</p>
              </div>
            )}

            <div className="form-actions">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button disabled={!canProceedStep2} onClick={() => setStep(3)} icon={ArrowRight}>Continue</Button>
            </div>
          </>
        )}

        {/* ── Step 3: Learning preferences ── */}
        {step === 3 && (
          <>
            <span className="label">Learning preferences</span>
            <h3>What would you like to focus on?</h3>
            <p className="step-intro">Choose the subjects and days that work best for {firstName}.</p>

            <div className="enrol-section">
              <label className="enrol-field-label">Learning areas <span className="enrol-required">*</span></label>
              <div className="enrol-tag-group">
                {SUBJECTS.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`enrol-tag ${learning.subjects.includes(s) ? 'active' : ''}`}
                    onClick={() => setLearning({ ...learning, subjects: toggleItem(learning.subjects, s) })}
                  >
                    {learning.subjects.includes(s) && <Check size={11} />}{s}
                  </button>
                ))}
              </div>
            </div>

            <div className="enrol-section">
              <label className="enrol-field-label">Preferred days <span className="enrol-required">*</span></label>
              <div className="enrol-tag-group">
                {DAYS.map(d => (
                  <button
                    key={d}
                    type="button"
                    className={`enrol-tag ${learning.days.includes(d) ? 'active' : ''}`}
                    onClick={() => setLearning({ ...learning, days: toggleItem(learning.days, d) })}
                  >
                    {learning.days.includes(d) && <Check size={11} />}{d}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: 18 }}>
              <label style={{ gridColumn: '1 / -1' }}>
                Learning goals
                <input
                  value={learning.goals}
                  onChange={e => setLearning({ ...learning, goals: e.target.value })}
                  placeholder={`e.g. Build confidence with fractions`}
                />
              </label>
              <label style={{ gridColumn: '1 / -1' }}>
                Anything else we should know?
                <textarea
                  value={learning.notes}
                  onChange={e => setLearning({ ...learning, notes: e.target.value })}
                  placeholder={`e.g. ${firstName} loves creative challenges and works best in small groups.`}
                  rows={3}
                />
              </label>
            </div>

            <div className="form-actions">
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button disabled={!canProceedStep3} onClick={() => setStep(4)} icon={ArrowRight}>Continue</Button>
            </div>
          </>
        )}

        {/* ── Step 4: Term preferences ── */}
        {step === 4 && (
          <>
            <span className="label">A couple of final checks</span>
            <h3>Almost there!</h3>
            <div className="form-grid">
              <label>
                Preferred tutor
                <select value={prefs.tutor} onChange={e => setPrefs({ ...prefs, tutor: e.target.value })}>
                  {TUTORS.map(t => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>
                Weekly sessions
                <select value={prefs.sessions} onChange={e => setPrefs({ ...prefs, sessions: e.target.value })}>
                  {SESSION_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label style={{ gridColumn: '1 / -1' }}>
                How did you hear about us?
                <select value={prefs.referral} onChange={e => setPrefs({ ...prefs, referral: e.target.value })}>
                  {REFERRAL_OPTIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </label>
            </div>

            <div className="enrol-terms-check" onClick={() => setAgreedToTerms(v => !v)}>
              <span className={`goal-check ${agreedToTerms ? 'done' : ''}`}>{agreedToTerms && <Check size={13} />}</span>
              <span>I have read and agree to the <a href="#" onClick={e => e.stopPropagation()}>Fairybread &amp; Fractions Terms &amp; Conditions</a></span>
            </div>

            <div className="form-actions">
              <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
              <Button disabled={!canProceedStep5} onClick={() => setStep(5)} icon={ArrowRight}>Continue</Button>
            </div>
          </>
        )}

        {/* ── Step 5: Signature ── */}
        {step === 5 && (
          <>
            <span className="label">Signature</span>
            <h3>Sign on the dotted line</h3>
            <p className="step-intro">Type your full name below to confirm {firstName}'s enrolment.</p>
            <div className="signature-area">
              <input
                className="signature-input"
                value={signature}
                onChange={e => setSignature(e.target.value)}
                placeholder="Type your full name"
              />
              <div className="signature-line" />
            </div>
            <p className="signature-terms">By signing, you confirm you've read and agree to the Fairybread &amp; Fractions Terms &amp; Conditions.</p>
            <div className="form-actions">
              <Button variant="ghost" onClick={() => setStep(4)}>Back</Button>
              <Button disabled={!canComplete} onClick={completeEnrolment} icon={ArrowRight}>Complete enrolment</Button>
            </div>
          </>
        )}

        {/* ── Step 6: Complete ── */}
        {step === 6 && (
          <div className="complete-state">
            <Confetti />
            <div className="success-mark"><Check size={27} /></div>
            <h2>All set, {parent.name.split(' ')[0]}.</h2>
            <p>{firstName}'s learning journey is ready to begin. We can't wait to see them shine.</p>
            <Button onClick={() => navigate('/parent/book-class')} icon={ArrowRight}>Explore classes</Button>
          </div>
        )}

      </div>
    </div>
  );
}
