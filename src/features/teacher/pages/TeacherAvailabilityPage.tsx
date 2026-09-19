// TODO: scope pending client confirmation — availability management not yet fully defined.
// Build stub UI only until client confirms whether teachers manage availability independently
// or admin controls the timetable.

export function TeacherAvailabilityPage() {
  return (
    <div className="page-stack narrow-page">
      <div className="card">
        <span className="label">Coming soon</span>
        <h3>Availability management</h3>
        <p className="empty-state-text">
          This feature is pending client confirmation on scope. Teachers will be able to set their available days and times here.
        </p>
      </div>
    </div>
  );
}
