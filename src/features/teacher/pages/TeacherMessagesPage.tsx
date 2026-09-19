import { ArrowRight, Bell, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// TODO: scope pending client confirmation — full extent of teacher messaging permissions not yet confirmed.
const conversations = [
  { name: 'Sarah Johnson', text: "Question about Emma's homework", time: 'Today', c: 'pink', unread: true },
  { name: 'Admin', text: 'Timetable update for next term', time: 'Yesterday', c: 'teal', unread: false },
];

export function TeacherMessagesPage() {
  return (
    <div className="page-stack messages-layout">
      <div className="card conversation-list">
        <div className="card-heading">
          <div><span className="label">Inbox</span><h3>Messages</h3></div>
          <Button variant="soft" icon={Plus}>New</Button>
        </div>
        {conversations.map((conv, i) => (
          <button className={`conversation ${i === 0 ? 'active' : ''}`} key={conv.name}>
            <div className={`mini-avatar ${conv.c}-bg`}>{conv.name.split(' ').map(x => x[0]).join('')}</div>
            <div><strong>{conv.name}</strong><span>{conv.text}</span></div>
            <small>{conv.time}</small>
          </button>
        ))}
      </div>
      <div className="card chat-window">
        <div className="chat-head">
          <div className="mini-avatar pink-bg">SJ</div>
          <div><strong>Sarah Johnson</strong><span>Parent of Emma Johnson</span></div>
          <MoreHorizontal size={18} />
        </div>
        <div className="chat-body">
          <div className="chat-bubble received">Hi Jessica! Quick question about Emma's homework from Monday's session.<small>9:14 AM</small></div>
          <div className="chat-bubble sent">Hi Sarah! Happy to help — what would you like to know?</div>
        </div>
        <div className="chat-input">
          <input placeholder="Write a message..." />
          <button><ArrowRight size={17} /></button>
        </div>
      </div>
    </div>
  );
}
