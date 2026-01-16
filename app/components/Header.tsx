import Image from 'next/image';

export type TabType = 'overview' | 'discharge' | 'weather' | 'rain-gauge';

const tabs: { id: TabType; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'discharge', label: 'Discharge Station' },
  { id: 'weather', label: 'Automatic Weather Station' },
  { id: 'rain-gauge', label: 'Rain Gauge Station' },
];

interface HeaderProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export default function Header({ activeTab = 'overview', onTabChange }: HeaderProps) {
  return (
    <header style={{ backgroundColor: '#f5f5f5' }}>
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo Left */}
        <div className="relative w-[50px] h-[52px]">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-cover"
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-6 py-2.5 text-base font-medium rounded-lg transition-colors ${activeTab === tab.id
                ? 'bg-white border-2'
                : 'text-gray-400 hover:text-gray-600'
                }`}
              style={activeTab === tab.id ? {
                color: '#369fff',
                borderColor: '#369fff'
              } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Logo Right */}
        <div className="relative w-[50px] h-[52px]">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}