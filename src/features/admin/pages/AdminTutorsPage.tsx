import { Check, MoreHorizontal, Plus, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

const colours = ['pink', 'yellow', 'teal', 'orange', 'green', 'magenta'];

export function AdminTutorsPage() {
  const [tutors, setTutors] = useState([
    { name: 'Jessica Taylor', initials: 'JT', subjects: ['Mathematics', 'English'], students: 24, color: 'pink', classes: [{ subject: 'Mathematics', day: 'Monday', time: '3:30 PM', capacity: '12 / 15', color: 'pink' }] },
    { name: 'Sarah Wilson', initials: 'SW', subjects: ['English', 'Reading'], students: 21, color: 'teal', classes: [{ subject: 'English', day: 'Wednesday', time: '4:30 PM', capacity: '13 / 15', color: 'teal' }] },
    { name: 'Daniel Smith', initials: 'DS', subjects: ['Reading'], students: 15, color: 'orange', classes: [{ subject: 'Reading', day: 'Thursday', time: '4:00 PM', capacity: '15 / 15', color: 'orange' }] },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', subjects: '', contact: '' });
  const save = () => {
    if (!form.name.trim()) return;
    const initials = form.name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
    const subjects = form.subjects.split(',').map(s => s.trim()).filter(Boolean);
    setTutors(t => [{ name: form.name, initials, subjects: subjects.length ? subjects : ['General'], students: 0, color: colours[t.length % colours.length], classes: [] }, ...t]);
    setForm({ name: '', subjects: '', contact: '' });
    setShowAdd(false);
  };
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>{tutors.length} active tutors</h2><p>The wonderful people guiding every session.</p></div>
        <Button icon={Plus} onClick={() => setShowAdd(true)}>Add tutor</Button>
      </div>
      <div className="tutor-grid">
        {tutors.map(t => (
          <div className="card tutor-card" key={t.name}>
            <div className="tutor-card-head">
              <div className={`mini-avatar ${t.color}-bg`}>{t.initials}</div>
              <div><strong>{t.name}</strong><span>{t.students} active students</span></div>
              <MoreHorizontal size={18} />
            </div>
            <div className="tutor-subjects">{t.subjects.map(s => <span key={s} className={`tutor-subject-tag ${t.color}`}>{s}</span>)}</div>
            <div className="tutor-classes">
              <span className="label">Classes assigned</span>
              {t.classes.map((c, i) => (
                <div className="tutor-class-row" key={i}>
                  <span className={`today-dot ${c.color}`} />
                  <div><strong>{c.subject}</strong><span>{c.day} · {c.time}</span></div>
                  <b>{c.capacity}</b>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdd(false)}><X size={18} /></button>
            <div className="modal-icon"><UserRound size={22} /></div>
            <h2>Add tutor</h2>
            <div className="add-modal-form">
              <label>Tutor name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rebecca Martin" /></label>
              <label>Subject(s) taught<input value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} placeholder="e.g. Mathematics, English" /></label>
              <label>Contact<input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="e.g. rebecca@email.com" /></label>
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
