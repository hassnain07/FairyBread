import { BookOpen, Check, MoreHorizontal, Plus, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Progress } from '../../../components/ui/Progress';

type AttendanceStatus = 'Present' | 'Absent' | 'No-show';
const colours = ['pink', 'yellow', 'teal', 'orange', 'green', 'magenta'];
const classEnrolment: Record<string, { name: string; color: string }[]> = {
  Mathematics: [{ name: 'Emma Johnson', color: 'pink' }, { name: 'Liam Taylor', color: 'magenta' }, { name: 'Ava Wilson', color: 'teal' }],
  English: [{ name: 'Sophie Brown', color: 'orange' }, { name: 'Oliver Williams', color: 'teal' }],
  Reading: [{ name: 'Oliver Williams', color: 'teal' }, { name: 'Sophie Brown', color: 'orange' }, { name: 'Noah Martin', color: 'yellow' }],
};

export function AdminClassesPage() {
  const [classes, setClasses] = useState([
    ['Mathematics', 'Monday', '3:30 PM', 'Jessica Taylor', '12 / 15', 'pink'],
    ['English', 'Wednesday', '4:30 PM', 'Sarah Wilson', '13 / 15', 'teal'],
    ['Reading', 'Thursday', '4:00 PM', 'Daniel Smith', '15 / 15', 'orange'],
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ subject: '', day: 'Monday', time: '', tutor: 'Jessica Taylor', spaces: '15' });
  const [attendanceClass, setAttendanceClass] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>({});

  const save = () => {
    if (!form.subject.trim() || !form.time.trim()) return;
    setClasses(c => [[form.subject, form.day, form.time, form.tutor, `0 / ${form.spaces}`, colours[c.length % colours.length]], ...c]);
    setForm({ subject: '', day: 'Monday', time: '', tutor: 'Jessica Taylor', spaces: '15' });
    setShowAdd(false);
  };

  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>This week's timetable</h2><p>Classes, capacity and tutors at a glance.</p></div>
        <Button icon={Plus} onClick={() => setShowAdd(true)}>Create class</Button>
      </div>
      <div className="admin-class-grid">
        {classes.map(([x, d, t, u, c, col]) => (
          <div className={`card admin-class ${col}`} key={x + d + t}>
            <div className="class-card-top"><span className="class-subject">{x}</span><MoreHorizontal size={18} /></div>
            <h3>{d}</h3><strong>{t}</strong>
            <p><UserRound size={15} />{u}</p>
            <div className="capacity">
              <span>Capacity</span><b>{c}</b>
              <Progress value={(parseInt((c as string).split(' / ')[0]) / 15) * 100} color={col as string} />
            </div>
            {c === '15 / 15' && <span className="full-label">FULL</span>}
            <button className="take-attendance-btn" onClick={() => { setAttendanceClass(x as string); setStatuses({}); }}>
              <Check size={15} />Take Attendance
            </button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdd(false)}><X size={18} /></button>
            <div className="modal-icon"><BookOpen size={22} /></div>
            <h2>Create class</h2>
            <div className="add-modal-form">
              <label>Subject<input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Mathematics" /></label>
              <label>Day
                <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday'].map(d => <option key={d}>{d}</option>)}
                </select>
              </label>
              <label>Time<input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="e.g. 3:30 PM" /></label>
              <label>Tutor
                <select value={form.tutor} onChange={e => setForm({ ...form, tutor: e.target.value })}>
                  {['Jessica Taylor','Sarah Wilson','Daniel Smith'].map(t => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>Max spaces<input value={form.spaces} onChange={e => setForm({ ...form, spaces: e.target.value })} placeholder="15" /></label>
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setShowAdd(false)} icon={X}>Cancel</Button>
              <Button onClick={save} icon={Check}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {attendanceClass && (
        <div className="modal-backdrop" onClick={() => setAttendanceClass(null)}>
          <div className="modal attendance-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAttendanceClass(null)}><X size={18} /></button>
            <div className="modal-icon"><Check size={22} /></div>
            <h2>Take Attendance</h2>
            <p>{attendanceClass}</p>
            <div className="attendance-modal-list">
              {(classEnrolment[attendanceClass] || []).map(s => (
                <div className="attendance-modal-row" key={s.name}>
                  <div className={`mini-avatar ${s.color}-bg`}>{s.name.split(' ').map(x => x[0]).join('')}</div>
                  <strong>{s.name}</strong>
                  <div className="attendance-status-control">
                    {(['Present','Absent','No-show'] as AttendanceStatus[]).map(opt => (
                      <button key={opt} className={`attendance-status-btn ${opt.toLowerCase().replace('-','')} ${statuses[s.name] === opt ? 'active' : ''}`} onClick={() => setStatuses({ ...statuses, [s.name]: opt })}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="review-actions">
              <Button variant="ghost" onClick={() => setAttendanceClass(null)} icon={X}>Cancel</Button>
              <Button onClick={() => setAttendanceClass(null)} icon={Check}>Save Attendance</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
