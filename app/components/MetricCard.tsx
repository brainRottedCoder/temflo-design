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
      className={`rounded-[16px] px-4 py-3 min-h-[90px] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''}`}
      style={{
        backgroundColor: showActiveStyle ? 'rgba(37, 34, 227, 0.70)' : 'rgba(54, 159, 255, 0.10)',
      }}
      onClick={onClick}
    >
      <div
        className="text-sm font-medium mb-2 leading-tight"
        style={{ color: showActiveStyle ? '#ffffff' : '#8ea3b7' }}
      >
        {title}
      </div>
      <div className="flex items-end gap-2">
        <div
          className="h-[28px] w-[4px] rounded-sm"
          style={{ backgroundColor: showActiveStyle ? 'rgba(255,255,255,0.6)' : '#369fff' }}
        />
        <span
          className="text-[42px] font-bold leading-none"
          style={{ color: showActiveStyle ? '#ffffff' : '#369fff' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}