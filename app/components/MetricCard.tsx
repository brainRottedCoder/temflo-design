interface MetricCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export default function MetricCard({
  title,
  value,
  isPrimary = false,
  isActive = false,
  onClick
}: MetricCardProps) {
  const showActiveStyle = isPrimary || isActive;

  return (
    <div
      className={`rounded-[14px] px-3 py-2 min-h-[80px] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''}`}
      style={{
        backgroundColor: showActiveStyle ? 'rgba(37, 34, 227, 0.70)' : 'rgba(54, 159, 255, 0.10)',
      }}
      onClick={onClick}
    >
      <div
        className="text-base font-semibold mb-1 leading-tight"
        style={{ color: showActiveStyle ? '#ffffff' : '#8ea3b7' }}
      >
        {title}
      </div>
      <div className="flex items-end gap-2">
        <div
          className="h-[32px] w-[5px] rounded-sm"
          style={{ backgroundColor: showActiveStyle ? 'rgba(255,255,255,0.6)' : '#369fff' }}
        />
        <span
          className="text-[48px] font-bold leading-none"
          style={{ color: showActiveStyle ? '#ffffff' : '#369fff' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}