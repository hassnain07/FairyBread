import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Toggle } from '../../../components/ui/Toggle';

export function AdminSettingsPage() {
  const [prefs, setPrefs] = useState({ newBookings: true, cancellations: true, payments: true, reports: false, reminders: true });
  const labels: Record<string, string> = { newBookings: 'New bookings', cancellations: 'Cancellations', payments: 'Payment activity', reports: 'Weekly report summary', reminders: 'Session reminders' };
  return (
    <div className="page-stack narrow-page">
      <div className="card settings-card">
        <div className="card-heading"><div><span className="label">Business details</span><h3>Tutoring business information</h3></div></div>
        <div className="settings-form">
          <label>Business name<input defaultValue="Fairybread & Fractions" /></label>
          <label>Contact name<input defaultValue="Therese Howard" /></label>
          <label>Contact email<input defaultValue="hello@fairybreadandfractions.com" /></label>
          <label>Phone<input defaultValue="(02) 4000 1234" /></label>
        </div>
      </div>
      <div className="card settings-card">
        <div className="card-heading"><div><span className="label">Notification preferences</span><h3>What should we tell you about?</h3></div></div>
        <div className="toggle-list">
          {Object.keys(prefs).map(key => (
            <Toggle key={key} on={prefs[key as keyof typeof prefs]} onToggle={() => setPrefs(p => ({ ...p, [key]: !p[key as keyof typeof prefs] }))} label={labels[key]} sublabel={prefs[key as keyof typeof prefs] ? 'On' : 'Off'} />
          ))}
        </div>
      </div>
      <Button icon={Check}>Save changes</Button>
    </div>
  );
}
