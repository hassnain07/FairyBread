import { Check, FileText, Plus, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

type ReportRow = { student: string; report: string; purchased: string; status: string; tutor: string; due: string; };

export function AdminReportsPage() {
  const [rows, setRows] = useState<ReportRow[]>([
    { student: 'Emma Johnson', report: 'End of Term · T3', purchased: 'Yes', status: 'Ready', tutor: 'Jessica Taylor', due: 'Today' },
    { student: 'Oliver Williams', report: 'Progress update', purchased: 'Yes', status: 'In Progress', tutor: 'Daniel Smith', due: '18 Oct' },
    { student: 'Sophie Brown', report: 'End of Term · T3', purchased: 'Yes', status: 'Delivered', tutor: 'Sarah Wilson', due: '—' },
    { student: 'Liam Taylor', report: 'Progress update', purchased: 'No', status: 'Purchased', tutor: 'Jessica Taylor', due: '21 Oct' },
  ]);
  const [genIdx, setGenIdx] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ student: 'Emma Johnson', term: 'End of Term · T3' });
  const genRow = genIdx !== null ? rows[genIdx] : null;
  const markReady = () => {
    if (genIdx === null) return;
    setRows(rs => rs.map((r, i) => i === genIdx ? { ...r, status: 'Ready' } : r));
    setGenIdx(null);
  };
  const save = () => {
    setRows(r => [{ student: form.student, report: form.term, purchased: 'No', status: 'In Progress', tutor: 'Jessica Taylor', due: '—' }, ...r]);
    setShowAdd(false);
  };
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>Reports</h2><p>Progress updates ready when you are.</p></div>
        <Button icon={Plus} onClick={() => setShowAdd(true)}>Create report</Button>
      </div>
      <div className="card table-card">
        <div className="table-wrap">
          <table>
            <thead><tr>{['Student','Report','Purchased','Status','Tutor','Due',''].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td><strong className="table-name">{r.student}</strong></td>
                  <td>{r.report}</td>
                  <td>{r.purchased}</td>
                  <td><span className={`table-status ${r.status.toLowerCase().replace(' ', '-')}`}>{r.status}</span></td>
                  <td>{r.tutor}</td>
                  <td>{r.due}</td>
                  <td>{r.status === 'In Progress' && <button className="text-link" onClick={() => setGenIdx(i)}><Sparkles size={14} />Generate Report</button>}</td>
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
            <div className="modal-icon"><FileText size={22} /></div>
            <h2>Create report</h2>
            <div className="add-modal-form">
              <label>Student
                <select value={form.student} onChange={e => setForm({ ...form, student: e.target.value })}>
                  {['Emma Johnson','Oliver Williams','Sophie Brown','Liam Taylor'].map(s => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label>Term<input value={form.term} onChange={e => setForm({ ...form, term: e.target.value })} /></label>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setShowAdd(false)} icon={X}>Cancel</Button>
              <Button onClick={save} icon={Check}>Save</Button>
            </div>
          </div>
        </div>
      )}
      {genRow && (
        <div className="modal-backdrop" onClick={() => setGenIdx(null)}>
          <div className="modal report-gen-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setGenIdx(null)}><X size={18} /></button>
            <div className="modal-icon report"><FileText size={22} /></div>
            <h2>Generate report</h2>
            <p>A preview of {genRow.student.split(' ')[0]}'s progress, ready to review and publish.</p>
            <div className="report-preview-content">
              <div className="report-preview-section">
                <span className="label">Subject ratings</span>
                <div className="star-row"><span>Mathematics</span><b>★★★★<i>★</i></b></div>
                <div className="star-row"><span>English</span><b>★★★★<i>★</i></b></div>
              </div>
              <div className="report-preview-section">
                <span className="label">Tutor recommendation</span>
                <p className="report-preview-quote">"Continue weekly sessions. Ready for the next challenge."</p>
              </div>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setGenIdx(null)} icon={X}>Cancel</Button>
              <Button onClick={markReady} icon={Check}>Mark as Ready</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
