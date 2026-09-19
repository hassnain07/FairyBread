import { ChevronRight, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Table } from '../../../components/ui/Table';

export function AdminBookingsPage() {
  return (
    <div className="page-stack">
      <div className="page-toolbar">
        <div><h2>Bookings</h2><p>Manage every session with ease.</p></div>
        <Button variant="soft" icon={Download}>Export list</Button>
      </div>
      <div className="filter-bar card">
        <button className="filter-active">All dates <ChevronRight size={14} /></button>
        <button>Program <ChevronRight size={14} /></button>
        <button>Tutor <ChevronRight size={14} /></button>
        <button>Status <ChevronRight size={14} /></button>
      </div>
      <div className="card table-card">
        <Table
          headers={['Student', 'Program', 'Tutor', 'Date', 'Time', 'Source', 'Status', '']}
          rows={[
            ['Emma Johnson', 'Mathematics', 'Jessica Taylor', 'Mon 14 Oct', '3:30 PM', 'Term credit', 'Confirmed', 'Manage'],
            ['Oliver Williams', 'Reading', 'Daniel Smith', 'Tue 15 Oct', '4:00 PM', 'Term credit', 'Confirmed', 'Manage'],
            ['Sophie Brown', 'English', 'Sarah Wilson', 'Wed 16 Oct', '4:30 PM', 'Individual', 'Confirmed', 'Manage'],
            ['Liam Taylor', 'Mathematics', 'Jessica Taylor', 'Thu 17 Oct', '3:30 PM', 'Term credit', 'Cancelled', 'Manage'],
          ]}
        />
      </div>
    </div>
  );
}
