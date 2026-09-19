import { ArrowRight, Bell, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const conversations = [
  { name: 'Fairybread & Fractions', text: "Emma's assessment has been confirmed!", time: 'Just now', c: 'pink', reminder: true },
  { name: 'Jessica Taylor', text: 'Emma did a fantastic job with fractions today.', time: 'Yesterday', c: 'yellow', reminder: false },
  { name: 'Admin', text: 'Your next term payment is due soon.', time: 'Mon', c: 'teal', reminder: true },
];

export function MessagesPage() {
  return (
    <div className="page-stack messages-layout">
      <div className="card conversation-list">
        <div className="card-heading">
          <div><span className="label">Inbox</span><h3>Messages</h3></div>
          <Button variant="soft" icon={Plus}>New</Button>
        </div>
        {conversations.map((conv, i) => (
          <button className={`conversation ${i === 0 ? 'active' : ''}`} key={conv.name}>
            <div className={`mini-avatar ${conv.c}-bg`}>{conv.name === 'Admin' ? 'FF' : conv.name.split(' ').map(x => x[0]).join('')}</div>
            <div>
              <strong>{conv.name}</strong><span>{conv.text}</span>
              {conv.reminder && <span className="reminder-pill"><Bell size={11} />Reminder</span>}
            </div>
            <small>{conv.time}</small>
          </button>
        ))}
      </div>
      <div className="card chat-window">
        <div className="chat-head">
          <div className="mini-avatar pink-bg">FF</div>
          <div><strong>Fairybread &amp; Fractions</strong><span>Typically replies within a day</span></div>
          <MoreHorizontal size={18} />
        </div>
        <div className="chat-body">
          <div className="chat-reminder-label"><Bell size={12} />Assessment reminder</div>
          <div className="chat-bubble received">Hi Sarah! Emma's assessment has been confirmed for Tuesday 14 October at 3:30 PM.<small>10:42 AM</small></div>
          <div className="chat-bubble sent">Wonderful, thank you. We're looking forward to it!</div>
          <div className="chat-bubble received">We can't wait to meet her. See you then!</div>
        </div>
        <div className="chat-input">
          <input placeholder="Write a message..." />
          <button><ArrowRight size={17} /></button>
        </div>
      </div>
    </div>
  );
}
