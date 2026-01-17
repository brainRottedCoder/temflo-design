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
        <nav className="flex gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-6 py-2.5 text-sm font-medium font-semibold rounded-md border-2 transition-all ${activeTab === tab.id
                ? 'bg-white text-blue-500 border-blue-500'
                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-500'
                }`}
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