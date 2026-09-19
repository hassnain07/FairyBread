import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const lists = [
  { className: 'Mathematics · Mon 3:30 PM', color: 'pink', waiting: [{ name: 'Oliver Williams', pos: 1 }, { name: 'Liam Taylor', pos: 2 }] },
  { className: 'English · Wed 4:30 PM', color: 'teal', waiting: [{ name: 'Sophie Brown', pos: 1 }, { name: 'Charlotte Davis', pos: 2 }, { name: 'Noah Evans', pos: 3 }] },
  { className: 'Reading & Spelling · Thu 4:00 PM', color: 'orange', waiting: [{ name: 'Ava Martinez', pos: 1 }] },
];

export function AdminWaitingListsPage() {
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>3 classes with waiting lists</h2><p>6 families hoping for a spot to open up.</p></div>
      </div>
      {lists.map(l => (
        <div className="card" key={l.className}>
          <div className="card-heading">
            <div><span className="label">{l.className}</span><h3>{l.waiting.length} on the list</h3></div>
            <span className={`today-dot ${l.color}`} />
          </div>
          <div className="waiting-list-body">
            {l.waiting.map(w => (
              <div className="waiting-row" key={w.name}>
                <span className="waiting-pos">#{w.pos}</span>
                <div className="mini-avatar">{w.name.split(' ').map(x => x[0]).join('')}</div>
                <strong>{w.name}</strong>
                <Button variant="soft" icon={ArrowRight}>Offer spot</Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
