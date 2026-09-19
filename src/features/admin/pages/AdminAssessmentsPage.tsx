import { Check, ClipboardList, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Table } from '../../../components/ui/Table';

export function AdminAssessmentsPage() {
  const [rows, setRows] = useState<string[][]>([
    ['Emma Johnson', 'Sarah Johnson', 'Tue 14 Oct', '3:30 PM', 'Paid', 'Pending', 'View'],
    ['Noah Martin', 'Kate Martin', 'Tue 14 Oct', '4:30 PM', 'Paid', 'Pending', 'View'],
    ['Mia Chen', 'David Chen', 'Thu 16 Oct', '3:30 PM', 'Pending', 'Pending', 'View'],
    ['Leo Jones', 'Amelia Jones', 'Fri 17 Oct', '4:00 PM', 'Paid', 'Complete', 'View'],
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ student: '', date: '', time: '3:30 PM' });
  const save = () => {
    if (!form.student.trim()) return;
    const d = form.date ? new Date(form.date + 'T00:00:00') : new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
    setRows(r => [[form.student, '—', dateStr, form.time, 'Pending', 'Upcoming', 'View'], ...r]);
    setForm({ student: '', date: '', time: '3:30 PM' });
    setShowAdd(false);
  };
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>Upcoming assessments</h2><p>Six first steps are waiting to happen.</p></div>
        <Button icon={Plus} onClick={() => setShowAdd(true)}>Book assessment</Button>
      </div>
      <div className="card table-card">
        <Table headers={['Student', 'Parent', 'Date', 'Time', 'Payment', 'Outcome', '']} rows={rows} />
      </div>
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdd(false)}><X size={18} /></button>
            <div className="modal-icon"><ClipboardList size={22} /></div>
            <h2>Book assessment</h2>
            <div className="add-modal-form">
              <label>Student name<input value={form.student} onChange={e => setForm({ ...form, student: e.target.value })} placeholder="e.g. Emma Johnson" /></label>
              <label>Date<input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label>
              <label>Time slot
                <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
                  {['3:30 PM','4:00 PM','4:30 PM','5:00 PM'].map(t => <option key={t}>{t}</option>)}
                </select>
              </label>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setShowAdd(false)} icon={X}>Cancel</Button>
              <Button onClick={save} icon={Check}>Book assessment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
