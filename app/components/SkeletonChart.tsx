interface SkeletonChartProps {
    compact?: boolean;
}

export default function SkeletonChart({ compact = false }: SkeletonChartProps) {
    const barCount = compact ? 3 : 8;

    return (
        <div className={`bg-white rounded-lg 2xl:rounded-xl shadow-[0_2px_24px_rgba(0,0,0,0.05)] ${compact ? 'p-2 2xl:p-3' : 'p-3 2xl:p-4'} h-full flex flex-col animate-pulse`}>
            {/* Title pill skeleton */}
            <div className={`${compact ? 'h-4 w-16' : 'h-6 2xl:h-7 w-24'} bg-gray-300 rounded-md 2xl:rounded-lg mb-2 2xl:mb-3`} />

            {/* Chart area skeleton */}
            <div className="flex-1 min-h-0 flex items-end justify-around gap-1 2xl:gap-2 pb-4">
                {Array.from({ length: barCount }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-1 flex-1"
                    >
                        {/* Bar skeleton with varying heights */}
                        <div
                            className={`w-full max-w-[${compact ? '8px' : '14px'}] bg-gray-300 rounded-t`}
                            style={{
                                height: `${30 + Math.random() * 50}%`,
                                maxWidth: compact ? '8px' : '14px'
                            }}
                        />
                        {/* Label skeleton */}
                        <div className={`${compact ? 'h-2 w-4' : 'h-3 w-6'} bg-gray-200 rounded`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
