import { Check, GraduationCap, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Table } from '../../../components/ui/Table';

export function AdminStudentsPage() {
  const [rows, setRows] = useState<string[][]>([
    ['Emma Johnson', 'Sarah Johnson', 'Year 5', 'Maths & English', '94%', '3 / 4', 'Active'],
    ['Oliver Williams', 'Michael Williams', 'Year 3', 'Reading', '96%', '2 / 2', 'Active'],
    ['Sophie Brown', 'Claire Brown', 'Year 6', 'English', '88%', '1 / 2', 'Active'],
    ['Liam Taylor', 'James Taylor', 'Year 4', 'Mathematics', '82%', '2 / 3', 'Review'],
    ['Ava Wilson', 'Sarah Wilson', 'Year 5', 'Maths & English', '100%', '2 / 2', 'Active'],
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', year: 'Year 5', program: 'Mathematics' });
  const save = () => {
    if (!form.name.trim()) return;
    setRows(r => [[form.name, '—', form.year, form.program, '—', '0 / 0', 'Active'], ...r]);
    setForm({ name: '', year: 'Year 5', program: 'Mathematics' });
    setShowAdd(false);
  };
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>{rows.length} active students</h2><p>All the young people making progress.</p></div>
        <div className="toolbar-actions">
          <div className="search-box"><Search size={16} /><input placeholder="Search students" /></div>
          <Button icon={Plus} onClick={() => setShowAdd(true)}>Add student</Button>
        </div>
      </div>
      <div className="card table-card">
        <Table headers={['Student', 'Parent', 'Year', 'Program', 'Attendance', 'Sessions', 'Status']} rows={rows} />
      </div>
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdd(false)}><X size={18} /></button>
            <div className="modal-icon"><GraduationCap size={22} /></div>
            <h2>Add student</h2>
            <div className="add-modal-form">
              <label>Student name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Charlotte Davis" /></label>
              <label>Year level
                <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
                  {['Year 1','Year 2','Year 3','Year 4','Year 5','Year 6'].map(y => <option key={y}>{y}</option>)}
                </select>
              </label>
              <label>Program
                <select value={form.program} onChange={e => setForm({ ...form, program: e.target.value })}>
                  {['Mathematics','English','Reading & Spelling','Maths & English'].map(p => <option key={p}>{p}</option>)}
                </select>
              </label>
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
