export function Avatar({ initials, color = '', size = 'md' }: { initials: string; color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'large' : size === 'sm' ? 'small' : '';
  return (
    <div className={`mini-avatar ${color ? `${color}-bg` : ''} ${sizeClass}`}>
      {initials}
    </div>
  );
}
