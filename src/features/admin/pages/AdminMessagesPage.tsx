import { ArrowRight, Bell, Check, Mail, Plus, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

export function AdminMessagesPage() {
  const [rows, setRows] = useState([
    { recipient: 'Sarah Johnson', subject: "Emma's assessment confirmed", sent: 'Today, 10:42 AM', status: 'Replied', reminder: true },
    { recipient: 'Michael Williams', subject: 'Term 3 welcome', sent: 'Yesterday', status: 'Delivered', reminder: false },
    { recipient: 'Claire Brown', subject: 'Payment reminder', sent: 'Mon, 9:15 AM', status: 'Delivered', reminder: true },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ recipient: 'Sarah Johnson', message: '' });
  const save = () => {
    if (!form.message.trim()) return;
    setRows(r => [{ recipient: form.recipient, subject: form.message, sent: 'Just now', status: 'Delivered', reminder: false }, ...r]);
    setForm({ recipient: 'Sarah Johnson', message: '' });
    setShowAdd(false);
  };
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>Communication centre</h2><p>A warm, helpful touchpoint for every family.</p></div>
        <Button icon={Plus} onClick={() => setShowAdd(true)}>New message</Button>
      </div>
      <div className="admin-message-actions">
        {[['Send message', 'To one family', 'pink', false], ['Send announcement', 'To all families', 'yellow', true], ['Payment reminder', 'Friendly nudge', 'teal', true], ['Booking reminder', 'Coming up soon', 'orange', true]].map(([x, y, c, reminder]) => (
          <button className="card" key={x as string}>
            <span className={`${c}-bg`}>{Boolean(reminder) ? <Bell size={18} /> : <Sparkles size={18} />}</span>
            <div><strong>{x}</strong><small>{y}</small></div>
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      <div className="card table-card">
        <div className="card-heading"><div><span className="label">Recent conversations</span><h3>Stay connected</h3></div></div>
        <div className="table-wrap">
          <table>
            <thead><tr>{['Recipient','Subject','Last sent','Status',''].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td><strong className="table-name">{r.recipient}</strong></td>
                  <td>{r.subject}{r.reminder && <span className="reminder-pill"><Bell size={11} />Reminder</span>}</td>
                  <td>{r.sent}</td>
                  <td><span className={`table-status ${r.status.toLowerCase()}`}>{r.status}</span></td>
                  <td>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdd(false)}><X size={18} /></button>
            <div className="modal-icon"><Mail size={22} /></div>
            <h2>New message</h2>
            <div className="add-modal-form">
              <label>Recipient
                <select value={form.recipient} onChange={e => setForm({ ...form, recipient: e.target.value })}>
                  {['Sarah Johnson','Michael Williams','Claire Brown','James Taylor'].map(p => <option key={p}>{p}</option>)}
                </select>
              </label>
              <label>Message<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Type your message here..." rows={4} /></label>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setShowAdd(false)} icon={X}>Cancel</Button>
              <Button onClick={save} icon={Check}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
