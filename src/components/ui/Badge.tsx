type BadgeVariant = 'confirmed' | 'pending' | 'failed' | 'present' | 'absent' | 'noshow' | 'view' | 'active' | 'expired' | 'cancelled' | 'delivered' | 'replied' | 'in-progress' | 'ready' | 'purchased';

export function Badge({ children, variant }: { children: React.ReactNode; variant: BadgeVariant }) {
  return <span className={`status ${variant}`}>{children}</span>;
}
