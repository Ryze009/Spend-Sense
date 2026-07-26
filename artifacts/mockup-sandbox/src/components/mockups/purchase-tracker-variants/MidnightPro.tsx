import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import {
  LayoutDashboard, ShoppingBag, BarChart2, Target, Tag, FileImage, Settings,
  Wallet, TrendingUp, TrendingDown, Plus, ChevronDown, CreditCard,
  MonitorSmartphone, Briefcase, Zap, Home
} from 'lucide-react';

// Hardcoded Data
const barData = [
  { name: 'Feb', value: 1200 },
  { name: 'Mar', value: 1900 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 2400 },
  { name: 'Jun', value: 1600 },
  { name: 'Jul', value: 2697 },
];

const pieData = [
  { name: 'Electronics', value: 1200, color: '#3b82f6' },
  { name: 'Software', value: 800, color: '#a78bfa' },
  { name: 'Travel', value: 400, color: '#f472b6' },
  { name: 'Food', value: 150, color: '#34d399' },
  { name: 'Other', value: 147, color: '#fb923c' },
];

const recentPurchases = [
  { id: 1, name: 'MacBook Pro M3', merchant: 'Apple', date: 'Jul 24, 2026', amount: 1999.00, method: 'Corporate Card', icon: MonitorSmartphone, color: '#3b82f6' },
  { id: 2, name: 'Figma Annual', merchant: 'Figma', date: 'Jul 22, 2026', amount: 144.00, method: 'PayPal', icon: Zap, color: '#a78bfa' },
  { id: 3, name: 'Flight to NY', merchant: 'Delta', date: 'Jul 18, 2026', amount: 350.00, method: 'Corporate Card', icon: Briefcase, color: '#f472b6' },
  { id: 4, name: 'Team Dinner', merchant: 'Osteria', date: 'Jul 15, 2026', amount: 180.00, method: 'Personal Card', icon: Home, color: '#34d399' },
  { id: 5, name: 'AWS Hosting', merchant: 'Amazon Web Services', date: 'Jul 12, 2026', amount: 24.69, method: 'Corporate Card', icon: Zap, color: '#fb923c' },
];

export default function MidnightPro() {
  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', color: '#f1f5f9', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: '#0d1526', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Wallet size={28} color="#f1f5f9" />
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>SpendTrack</span>
        </div>

        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={ShoppingBag} label="Purchases" />
          <NavItem icon={BarChart2} label="Analytics" />
          <NavItem icon={Target} label="Budgets" />
          <NavItem icon={Tag} label="Categories" />
          <NavItem icon={FileImage} label="Receipts" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff' }}>
            JD
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>John Doe</div>
            <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 500 }}>Pro Plan</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        {/* Header */}
        <header style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>Dashboard</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', padding: '8px 16px', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
              July 2026 <ChevronDown size={16} color="#94a3b8" />
            </button>
            <button style={{ background: '#3b82f6', border: 'none', borderRadius: '8px', padding: '8px 16px', color: '#fff', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Plus size={16} /> Add Purchase
            </button>
          </div>
        </header>

        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <StatCard 
              title="Total Spend" 
              value="$3,566.11" 
              subtitle="+12.4% from last month" 
              trend="up" 
              icon={Wallet} 
            />
            <StatCard 
              title="This Month" 
              value="$2,697.69" 
              subtitle="vs $543.21 last month" 
              trend="down" 
              icon={TrendingUp} 
            />
            <StatCard 
              title="Purchases" 
              value="8" 
              subtitle="Total transactions" 
              trend="neutral" 
              icon={ShoppingBag} 
            />
            <StatCard 
              title="Avg. Purchase" 
              value="$445.76" 
              subtitle="Per transaction" 
              trend="neutral" 
              icon={CreditCard} 
            />
          </div>

          {/* Charts Row */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Bar Chart */}
            <div style={glassCardStyle({ flex: 2, padding: '24px', display: 'flex', flexDirection: 'column' })}>
              <div style={{ marginBottom: '24px', fontSize: '16px', fontWeight: 500 }}>Monthly Spending</div>
              <div style={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                      contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#f1f5f9' }}
                      itemStyle={{ color: '#3b82f6' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart */}
            <div style={glassCardStyle({ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' })}>
              <div style={{ marginBottom: '24px', fontSize: '16px', fontWeight: 500 }}>By Category</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#f1f5f9' }}
                      itemStyle={{ color: '#f1f5f9' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {pieData.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                      <span style={{ color: '#94a3b8' }}>{item.name}</span>
                    </div>
                    <span>${item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Purchases */}
          <div style={glassCardStyle({ padding: '24px' })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 500 }}>Recent Purchases</div>
              <a href="#" style={{ color: '#60a5fa', fontSize: '14px', textDecoration: 'none' }}>View all &rarr;</a>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ paddingBottom: '16px', color: '#475569', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase' }}>Transaction</th>
                  <th style={{ paddingBottom: '16px', color: '#475569', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase' }}>Date</th>
                  <th style={{ paddingBottom: '16px', color: '#475569', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase' }}>Method</th>
                  <th style={{ paddingBottom: '16px', color: '#475569', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s', cursor: 'pointer' }} 
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                        <p.icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '14px' }}>{p.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '13px' }}>{p.merchant}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 0', color: '#94a3b8', fontSize: '14px' }}>{p.date}</td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ background: '#1e293b', color: '#94a3b8', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 500 }}>
                        {p.method}
                      </span>
                    </td>
                    <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 600, fontSize: '15px' }}>
                      ${p.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Floating FAB */}
      <button style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
        cursor: 'pointer'
      }}>
        <Plus size={24} />
      </button>
    </div>
  );
}

// Helpers

function glassCardStyle(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    ...extra
  };
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      background: active ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
      color: active ? '#f1f5f9' : '#94a3b8',
      position: 'relative',
      fontWeight: active ? 500 : 400,
    }}>
      {active && (
        <div style={{ position: 'absolute', left: 0, top: '4px', bottom: '4px', width: '3px', background: '#3b82f6', borderRadius: '0 4px 4px 0' }} />
      )}
      <Icon size={20} color={active ? '#3b82f6' : '#94a3b8'} />
      <span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}

function StatCard({ title, value, subtitle, trend, icon: Icon }: { title: string, value: string, subtitle: string, trend: 'up' | 'down' | 'neutral', icon: any }) {
  let trendColor = '#94a3b8';
  if (trend === 'up') trendColor = '#22d3ee'; // cyan
  if (trend === 'down') trendColor = '#f87171'; // red

  return (
    <div style={glassCardStyle({ padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative' })}>
      <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: trendColor }}>
        {subtitle}
      </div>
      <div style={{ position: 'absolute', top: '24px', right: '24px', color: '#475569' }}>
        <Icon size={20} />
      </div>
    </div>
  );
}