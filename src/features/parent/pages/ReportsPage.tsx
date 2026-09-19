import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SprinkleField } from '../../../components/ui/Sprinkles';

export function ReportsPage() {
  return (
    <div className="page-stack">
      <div className="report-hero">
        <SprinkleField count={12} />
        <div>
          <div className="eyebrow">End of Term Report · Term 3, 2025</div>
          <h2>Emma's learning journey</h2>
          <p>A thoughtful look at all the progress she's made.</p>
        </div>
        <div className="overall-score">
          <strong>4.2</strong><span>Overall progress</span>
          <div>★★★★<i>★</i></div>
        </div>
      </div>
      <div className="report-grid">
        <div className="card">
          <div className="card-heading">
            <div><span className="label">Learning snapshot</span><h3>Confidence is growing</h3></div>
            <span className="trend"><Zap size={14} /> This term</span>
          </div>
          <div className="star-row"><span>Mathematics</span><b>★★★★<i>★</i></b></div>
          <div className="star-row"><span>English</span><b>★★★★<i>★</i></b></div>
          <div className="star-row"><span>Reading</span><b>★★★<i>★★</i></b></div>
          <Button variant="soft" icon={ArrowRight}>View full report</Button>
        </div>
        <div className="card quote-card">
          <Sparkles size={21} />
          <span className="label">Tutor recommendation</span>
          <p>"Continue weekly Mathematics and English sessions. Emma is ready for the next challenge."</p>
          <div className="tutor-mini">
            <div className="mini-avatar pink-bg">JT</div>
            <small>Jessica Taylor<br /><b>Emma's tutor</b></small>
          </div>
        </div>
        <div className="card strength-card">
          <div className="strength-icon"><Star size={18} /></div>
          <span className="label">Strengths</span>
          <p>Emma has developed strong confidence with fractions and is increasingly comfortable explaining her mathematical reasoning.</p>
        </div>
        <div className="card continue-card">
          <div className="strength-icon orange-bg"><ArrowRight size={18} /></div>
          <span className="label">Areas to continue</span>
          <p>Reading comprehension<br />Written expression</p>
        </div>
      </div>
    </div>
  );
}
