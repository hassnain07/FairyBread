export function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="star-rating">
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={i < Math.floor(value) ? 'filled' : 'empty'}>★</i>
      ))}
    </span>
  );
}
