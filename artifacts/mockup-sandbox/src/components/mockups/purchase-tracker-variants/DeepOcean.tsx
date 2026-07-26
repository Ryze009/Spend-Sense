import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip
} from 'recharts';
import {
  Zap, LayoutDashboard, ShoppingBag, BarChart2, Target, Tag, Settings,
  Activity, Plus
} from 'lucide-react';

const COLORS = ['#58a6ff', '#bc8cff', '#ff7b72', '#3fb950', '#d29922'];

const MOCK_BAR_DATA = [
  { name: 'Aug', amount: 450 },
  { name: 'Sep', amount: 800 },
  { name: 'Oct', amount: 350 },
  { name: 'Nov', amount: 1200 },
  { name: 'Dec', amount: 600 },
  { name: 'Jan', amount: 950 },
];

const MOCK_PIE_DATA = [
  { name: 'Electronics', value: 1450 },
  { name: 'Software', value: 400 },
  { name: 'Office', value: 350 },
  { name: 'Travel', value: 800 },
  { name: 'Other', value: 200 },
];

const MOCK_ACTIVITY = [
  { id: 1, title: 'MacBook Pro M3', merchant: 'Apple Store', date: 'Jan 24, 2024', amount: 2499.00, color: '#58a6ff' },
  { id: 2, title: 'Figma Annual', merchant: 'Figma', date: 'Jan 22, 2024', amount: 144.00, color: '#bc8cff' },
  { id: 3, title: 'AWS Hosting', merchant: 'Amazon Web Services', date: 'Jan 20, 2024', amount: 345.50, color: '#ff7b72' },
  { id: 4, title: 'Flight to NY', merchant: 'Delta Airlines', date: 'Jan 15, 2024', amount: 450.00, color: '#3fb950' },
  { id: 5, title: 'Office Chair', merchant: 'Herman Miller', date: 'Jan 10, 2024', amount: 1195.00, color: '#d29922' },
  { id: 6, title: 'Github Copilot', merchant: 'Github', date: 'Jan 05, 2024', amount: 100.00, color: '#bc8cff' },
];

export default function DeepOcean() {
  return (
    <div style={{ background: '#0d1117', minHeight: '100vh', display: 'flex', color: '#e6edf3', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', background: '#161b22', borderRight: '1px solid #30363d', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={24} color="#e6edf3" />
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>DeepTrack</span>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#58a6ff', marginLeft: 'auto' }} />
        </div>
        <nav style={{ flex: 1, padding: '12px 0' }}>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<ShoppingBag size={18} />} label="Purchases" />
          <SidebarItem icon={<BarChart2 size={18} />} label="Analytics" />
          <SidebarItem icon={<Target size={18} />} label="Budgets" />
          <SidebarItem icon={<Tag size={18} />} label="Categories" />
        </nav>
        <div style={{ padding: '24px', borderTop: '1px solid #30363d' }}>
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, position: 'relative', overflowY: 'auto', padding: '32px' }}>
        
        {/* Hero Stats */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1117 100%)',
          border: '1px solid #30363d',
          borderRadius: '16px',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 0 30px rgba(88,166,255,0.12)',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ color: '#8b949e', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Spend</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff' }}>$3,566.11</div>
          </div>
          <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <div style={{ color: '#8b949e', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>This Month</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e6edf3' }}>$2,697.69</div>
          </div>
          <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <div style={{ color: '#8b949e', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Purchases</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e6edf3' }}>8 items</div>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: '100px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={18} color="#58a6ff" />
            <span style={{ color: '#8b949e', fontSize: '14px' }}>Avg Purchase:</span>
            <span style={{ fontWeight: '600' }}>$445.76</span>
          </div>
          <div style={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: '100px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Tag size={18} color="#bc8cff" />
            <span style={{ color: '#8b949e', fontSize: '14px' }}>Top Category:</span>
            <span style={{ fontWeight: '600' }}>Electronics</span>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
          <div style={{ flex: '0 0 55%', background: '#1c2333', border: '1px solid #30363d', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#e6edf3' }}>6-Month Overview</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_BAR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8b949e', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b949e', fontSize: 12 }} dx={-10} />
                  <Tooltip 
                    cursor={{ fill: '#21262d' }}
                    contentStyle={{ background: 'rgba(28, 35, 51, 0.9)', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3' }}
                    itemStyle={{ color: '#58a6ff' }}
                  />
                  <Bar dataKey="amount" fill="url(#colorBlue)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#79c0ff" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#58a6ff" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ flex: '0 0 calc(45% - 24px)', background: '#1c2333', border: '1px solid #30363d', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#e6edf3' }}>Spending Breakdown</h3>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, height: '260px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MOCK_PIE_DATA} innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                      {MOCK_PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <div style={{ fontSize: '14px', color: '#8b949e' }}>Total</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e6edf3' }}>$3.2k</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '16px' }}>
                {MOCK_PIE_DATA.map((entry, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: COLORS[index % COLORS.length] }} />
                    <span style={{ fontSize: '14px', color: '#e6edf3' }}>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e6edf3' }}>Recent Activity</h3>
            <span style={{ color: '#58a6ff', fontSize: '14px', cursor: 'pointer' }}>View All</span>
          </div>
          <div>
            {MOCK_ACTIVITY.map((item, index) => (
              <div key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: index < MOCK_ACTIVITY.length - 1 ? '1px solid #30363d' : 'none',
                transition: 'background 0.2s',
                cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(88,166,255,0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingLeft: '8px' }}>
                  <div style={{ width: '4px', height: '40px', background: item.color, borderRadius: '4px' }} />
                  <div>
                    <div style={{ fontWeight: '500', color: '#e6edf3', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#8b949e' }}>{item.merchant}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', paddingRight: '8px' }}>
                  <div style={{ fontWeight: '600', color: '#e6edf3', marginBottom: '4px' }}>${item.amount.toFixed(2)}</div>
                  <div style={{ fontSize: '14px', color: '#8b949e' }}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #30363d' }}>
            <span style={{ color: '#8b949e', fontSize: '14px', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e6edf3'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8b949e'}
            >
              Load more
            </span>
          </div>
        </div>

        {/* Floating Button */}
        <button style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          background: '#58a6ff',
          color: '#0d1117',
          border: 'none',
          borderRadius: '100px',
          height: '48px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(88,166,255,0.3)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Plus size={20} />
          Add Purchase
        </button>

      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div style={{ 
      padding: '12px 24px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      color: active ? '#e6edf3' : '#8b949e',
      background: active ? '#21262d' : 'transparent',
      borderLeft: active ? '2px solid #58a6ff' : '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.color = '#e6edf3';
        e.currentTarget.style.background = 'rgba(88,166,255,0.05)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.color = '#8b949e';
        e.currentTarget.style.background = 'transparent';
      }
    }}
    >
      {icon}
      <span style={{ fontSize: '14px', fontWeight: active ? '500' : '400' }}>{label}</span>
    </div>
  );
}
