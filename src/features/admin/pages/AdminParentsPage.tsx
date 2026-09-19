import { Check, ChevronRight, Mail, Plus, Search, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { TERM_BASE_PRICE, REGISTRATION_FEE, GST_RATE, TERM_CREDITS } from '../../../lib/config';

const TERM_TOTAL = Math.round((TERM_BASE_PRICE + REGISTRATION_FEE) * (1 + GST_RATE));
const colours = ['pink', 'yellow', 'teal', 'orange', 'green', 'magenta'];

type TermGatingState = 'NO_TERM_EVER' | 'ACTIVE_TERM' | 'TERM_EXPIRED';

type ParentRow = {
  name: string;
  email: string;
  phone: string;
  children: string[];
  paymentStatus: string;
  termState: TermGatingState;
  creditsRemaining: number;
  color: string;
};

const gatingLabel: Record<TermGatingState, string> = {
  NO_TERM_EVER: 'No term',
  ACTIVE_TERM: 'Active term',
  TERM_EXPIRED: 'Term expired',
};
const gatingClass: Record<TermGatingState, string> = {
  NO_TERM_EVER: 'pending',
  ACTIVE_TERM: 'confirmed',
  TERM_EXPIRED: 'failed',
};

export function AdminParentsPage() {
  const [parents, setParents] = useState<ParentRow[]>([
    { name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '0401 234 567', children: ['Emma', 'Oliver'], paymentStatus: 'Paid', termState: 'ACTIVE_TERM', creditsRemaining: 3, color: 'pink' },
    { name: 'Michael Williams', email: 'm.williams@email.com', phone: '0402 345 678', children: ['Oliver Williams'], paymentStatus: 'Paid', termState: 'ACTIVE_TERM', creditsRemaining: 0, color: 'teal' },
    { name: 'Claire Brown', email: 'claire.b@email.com', phone: '0403 456 789', children: ['Sophie Brown'], paymentStatus: 'Pending', termState: 'TERM_EXPIRED', creditsRemaining: 0, color: 'yellow' },
    { name: 'James Taylor', email: 'james.t@email.com', phone: '0404 567 890', children: ['Liam', 'Mia'], paymentStatus: 'Failed', termState: 'NO_TERM_EVER', creditsRemaining: 0, color: 'orange' },
  ]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', child: '' });
  const detail = selected !== null ? parents[selected] : null;

  const save = () => {
    if (!form.name.trim()) return;
    setParents(p => [{
      name: form.name, email: form.email || '—', phone: form.phone || '—',
      children: form.child ? [form.child] : [],
      paymentStatus: 'Pending', termState: 'NO_TERM_EVER', creditsRemaining: 0,
      color: colours[p.length % colours.length],
    }, ...p]);
    setForm({ name: '', email: '', phone: '', child: '' });
    setShowAdd(false);
  };

  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>{parents.length} parent accounts</h2><p>Families connected to Fairybread &amp; Fractions.</p></div>
        <div className="toolbar-actions">
          <div className="search-box"><Search size={16} /><input placeholder="Search parents" /></div>
          <Button icon={Plus} onClick={() => setShowAdd(true)}>Add parent</Button>
        </div>
      </div>
      <div className="card table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{['Family', 'Children', 'Contact', 'Term status', 'Credits left', 'Payment', ''].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {parents.map((p, i) => (
                <tr key={i} className="row-clickable" onClick={() => setSelected(i)}>
                  <td><strong className="table-name">{p.name}</strong></td>
                  <td>{p.children.join(', ') || '—'}</td>
                  <td>{p.email}</td>
                  <td><span className={`table-status ${gatingClass[p.termState]}`}>{gatingLabel[p.termState]}</span></td>
                  <td>{p.termState === 'ACTIVE_TERM' ? `${p.creditsRemaining} / ${TERM_CREDITS}` : '—'}</td>
                  <td><span className={`table-status ${p.paymentStatus.toLowerCase()}`}>{p.paymentStatus}</span></td>
                  <td><ChevronRight size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal parent-detail-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button>
            <div className="parent-detail-head">
              <div className={`mini-avatar ${detail.color}-bg`}>{detail.name.split(' ').map(x => x[0]).join('')}</div>
              <div><strong>{detail.name}</strong><span>{detail.email}</span></div>
            </div>
            <div className="parent-detail-body">
              <div className="review-detail-row"><span>Phone</span><b>{detail.phone}</b></div>
              <div className="review-detail-row"><span>Children</span><b>{detail.children.join(', ') || '—'}</b></div>
              <div className="review-detail-row"><span>Term status</span><span className={`table-status ${gatingClass[detail.termState]}`}>{gatingLabel[detail.termState]}</span></div>
              <div className="review-detail-row">
                <span>Credits remaining</span>
                <b>{detail.termState === 'ACTIVE_TERM' ? `${detail.creditsRemaining} of ${TERM_CREDITS} (shared across all children)` : '—'}</b>
              </div>
              <div className="review-detail-row"><span>Term fee</span><b>${TERM_TOTAL} AUD (incl. GST)</b></div>
              <div className="review-detail-row"><span>Payment status</span><span className={`table-status ${detail.paymentStatus.toLowerCase()}`}>{detail.paymentStatus}</span></div>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setSelected(null)} icon={X}>Close</Button>
              <Button onClick={() => setSelected(null)} icon={Mail}>Send message</Button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdd(false)}><X size={18} /></button>
            <div className="modal-icon"><Users size={22} /></div>
            <h2>Add parent</h2>
            <div className="add-modal-form">
              <label>Parent name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rebecca Martin" /></label>
              <label>Email<input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="e.g. rebecca@email.com" /></label>
              <label>Phone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 0400 123 456" /></label>
              <label>Linked child<input value={form.child} onChange={e => setForm({ ...form, child: e.target.value })} placeholder="e.g. Charlotte Martin" /></label>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setShowAdd(false)} icon={X}>Cancel</Button>
              <Button onClick={save} icon={Check}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
