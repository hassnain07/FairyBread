import { ArrowRight, Check, ChevronRight, Clock3, Plus, UserRound, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { TermCreditMeter } from '../../../components/domain/TermCreditMeter';
import { useBookingEligibility } from '../hooks/useBookingEligibility';
import { useAuth } from '../../../app/providers';

export function BookingsPage() {
  const navigate = useNavigate();
  const { familyId } = useAuth();
  const { activeTerm } = useBookingEligibility(familyId);

  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>Your week, sorted</h2><p>One less thing to keep in your head.</p></div>
        <Button icon={Plus} onClick={() => navigate('/parent/book-class')}>Book another class</Button>
      </div>
      {activeTerm && <TermCreditMeter term={activeTerm} />}
      <div className="booking-cards">
        <div className="card booking-card pink">
          <div className="booking-date"><span>MON</span><strong>14</strong><small>OCT</small></div>
          <div className="booking-main">
            <span className="label">Mathematics</span>
            <h3>Fractions foundations</h3>
            <p><Clock3 size={15} />3:30 PM – 4:30 PM</p>
            <p><UserRound size={15} />Jessica Taylor · Studio 1</p>
          </div>
          <div className="booking-right">
            <span className="status confirmed"><Check size={13} />Confirmed</span>
            <button>Manage booking <ChevronRight size={15} /></button>
          </div>
        </div>
        <div className="card booking-card teal">
          <div className="booking-date"><span>WED</span><strong>16</strong><small>OCT</small></div>
          <div className="booking-main">
            <span className="label">English</span>
            <h3>Reading with confidence</h3>
            <p><Clock3 size={15} />4:30 PM – 5:30 PM</p>
            <p><UserRound size={15} />Sarah Wilson · Studio 2</p>
          </div>
          <div className="booking-right">
            <span className="status confirmed"><Check size={13} />Confirmed</span>
            <button>Manage booking <ChevronRight size={15} /></button>
          </div>
        </div>
        <div className="card policy-card">
          <div className="policy-icon"><Clock3 size={19} /></div>
          <div><span className="label">Cancellation policy</span><p>Cancel 24+ hours before your session to restore your class credit.</p></div>
        </div>
      </div>
    </div>
  );
}
