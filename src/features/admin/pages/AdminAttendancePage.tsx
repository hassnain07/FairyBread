import { ChevronRight } from 'lucide-react';

const attendance = [
  { student: 'Emma Johnson', subject: 'Mathematics', time: '3:30 PM', status: 'Present' },
  { student: 'Oliver Williams', subject: 'Reading', time: '4:00 PM', status: 'Present' },
  { student: 'Sophie Brown', subject: 'English', time: '4:30 PM', status: 'Absent' },
  { student: 'Liam Taylor', subject: 'Mathematics', time: '5:00 PM', status: 'No-show' },
];

export function AdminAttendancePage() {
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>Attendance</h2><p>A clear view of every session check-in.</p></div>
        <div className="attendance-date">14 October 2025 <ChevronRight size={14} /></div>
      </div>
      <div className="attendance-admin-grid">
        {attendance.map((a, i) => (
          <div className="card attendance-admin-card" key={i}>
            <div className="mini-avatar pink-bg">{a.student.split(' ').map(x => x[0]).join('')}</div>
            <div><strong>{a.student}</strong><span>{a.subject} · {a.time}</span></div>
            <span className={`attendance-status ${a.status.toLowerCase().replace('-', '')}`}>{a.status}</span>
            <button><ChevronRight size={17} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
