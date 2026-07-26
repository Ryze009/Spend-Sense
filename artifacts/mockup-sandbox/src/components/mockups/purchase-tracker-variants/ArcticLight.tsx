import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart2,
  Target,
  Tag,
  Receipt,
  Settings,
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  CreditCard,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';

const spendingData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 250 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 340 },
  { name: 'Fri', value: 210 },
  { name: 'Sat', value: 450 },
  { name: 'Sun', value: 290 },
];

const categoryData = [
  { name: 'Groceries',     value: 850, color: 'rgba(37, 99, 235, 1)'   },
  { name: 'Dining',        value: 540, color: 'rgba(37, 99, 235, 0.8)' },
  { name: 'Transport',     value: 320, color: 'rgba(37, 99, 235, 0.6)' },
  { name: 'Utilities',     value: 240, color: 'rgba(37, 99, 235, 0.4)' },
  { name: 'Entertainment', value: 180, color: 'rgba(37, 99, 235, 0.2)' },
];

const transactionsThisMonth = [
  { id: 1, merchant: 'Whole Foods Market', category: 'Groceries',     date: 'Oct 24, 2023', amount: 142.50 },
  { id: 2, merchant: 'Uber',               category: 'Transport',     date: 'Oct 23, 2023', amount:  24.00 },
  { id: 3, merchant: 'Netflix',            category: 'Entertainment', date: 'Oct 21, 2023', amount:  15.99 },
];

const transactionsEarlier = [
  { id: 4, merchant: 'Sweetgreen',   category: 'Dining',     date: 'Oct 18, 2023', amount:  18.50 },
  { id: 5, merchant: 'Con Edison',   category: 'Utilities',  date: 'Oct 15, 2023', amount: 104.20 },
  { id: 6, merchant: "Trader Joe's", category: 'Groceries',  date: 'Oct 12, 2023', amount:  89.30 },
];

export default function ArcticLight() {
  return (
    <div className="flex min-h-screen font-sans" style={{ background: '#000000', color: '#f1f5f9' }}>

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className="w-[220px] flex flex-col justify-between hidden md:flex"
        style={{ background: '#0a0a0a', borderRight: '1px solid #1f1f1f' }}
      >
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid #1f1f1f' }}>
            <div className="w-7 h-7 bg-[#2563eb] rounded flex items-center justify-center text-white font-bold text-sm tracking-tight mr-3">
              PT
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#f1f5f9]">Purchase Tracker</span>
          </div>

          {/* Nav */}
          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#2563eb]"
               style={{ background: 'rgba(37,99,235,0.12)', borderLeft: '2px solid #2563eb' }}>
              <LayoutDashboard className="w-4 h-4 mr-3" />
              Overview
            </a>
            {[
              { icon: ShoppingBag, label: 'Transactions' },
              { icon: BarChart2,   label: 'Analytics'    },
              { icon: Target,      label: 'Budgets'      },
              { icon: Tag,         label: 'Categories'   },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#"
                 className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#6b7280] hover:text-[#f1f5f9] transition-colors"
                 style={{}}>
                <Icon className="w-4 h-4 mr-3" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="p-4" style={{ borderTop: '1px solid #1f1f1f' }}>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#6b7280] hover:text-[#f1f5f9] transition-colors mb-4">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </a>
          <div className="flex items-center px-3">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3" style={{ background: '#1f1f1f' }}>
              <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#f1f5f9]">John Doe</span>
              <span className="text-[10px] text-[#6b7280]">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8"
                style={{ background: '#000000', borderBottom: '1px solid #1f1f1f' }}>
          <div>
            <h1 className="text-lg font-medium tracking-tight text-[#f1f5f9]">Good morning, John.</h1>
            <p className="text-xs text-[#6b7280]">Here's your spending overview for October.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-[#6b7280] hover:text-[#f1f5f9] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-[#6b7280] hover:text-[#f1f5f9] transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Purchase
            </button>
          </div>
        </header>

        <div className="p-8 space-y-6 flex-1 overflow-auto">

          {/* ── KPI Cards ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Spent */}
            <div className="p-5 rounded-lg flex flex-col" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">Total Spent</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#2563eb]" style={{ background: 'rgba(37,99,235,0.15)' }}>
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#f1f5f9] mb-2">$2,130.50</div>
              <div className="flex items-center text-xs">
                <span className="flex items-center text-red-400 font-medium px-1.5 py-0.5 rounded mr-2" style={{ background: 'rgba(239,68,68,0.15)' }}>
                  <TrendingUp className="w-3 h-3 mr-1" />+12.5%
                </span>
                <span className="text-[#6b7280]">vs last month</span>
              </div>
            </div>

            {/* Transactions */}
            <div className="p-5 rounded-lg flex flex-col" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">Transactions</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#2563eb]" style={{ background: 'rgba(37,99,235,0.15)' }}>
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#f1f5f9] mb-2">42</div>
              <div className="flex items-center text-xs">
                <span className="flex items-center text-emerald-400 font-medium px-1.5 py-0.5 rounded mr-2" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <TrendingDown className="w-3 h-3 mr-1" />-4.2%
                </span>
                <span className="text-[#6b7280]">vs last month</span>
              </div>
            </div>

            {/* Top Category */}
            <div className="p-5 rounded-lg flex flex-col" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">Top Category</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#2563eb]" style={{ background: 'rgba(37,99,235,0.15)' }}>
                  <Tag className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#f1f5f9] mb-2">Groceries</div>
              <div className="flex items-center text-xs">
                <span className="text-[#94a3b8] font-medium mr-2">$850 spent</span>
                <span className="text-[#6b7280]">39% of total</span>
              </div>
            </div>

            {/* Active Subs */}
            <div className="p-5 rounded-lg flex flex-col" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">Active Subs</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#2563eb]" style={{ background: 'rgba(37,99,235,0.15)' }}>
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#f1f5f9] mb-2">8</div>
              <div className="flex items-center text-xs">
                <span className="text-[#94a3b8] font-medium mr-2">$112.50/mo</span>
                <span className="text-[#6b7280]">recurring</span>
              </div>
            </div>
          </div>

          {/* ── Charts ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Area chart */}
            <div className="p-6 rounded-lg lg:col-span-3" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
              <h2 className="text-sm font-semibold text-[#f1f5f9] mb-6">Spending Over Time</h2>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false}
                           tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false}
                           tick={{ fontSize: 12, fill: '#6b7280' }}
                           tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #2f2f2f', borderRadius: '6px', color: '#f1f5f9' }}
                      itemStyle={{ color: '#60a5fa', fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2}
                          fillOpacity={1} fill="url(#blueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category bars */}
            <div className="p-6 rounded-lg lg:col-span-2" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-[#f1f5f9]">Top Categories</h2>
                <button className="text-xs text-[#2563eb] font-medium hover:text-[#60a5fa] flex items-center transition-colors">
                  View All <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#94a3b8]">{cat.name}</span>
                      <span className="font-semibold text-[#f1f5f9]">${cat.value}</span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: '#1f1f1f' }}>
                      <div className="h-full rounded-full"
                           style={{ width: `${(cat.value / 850) * 100}%`, backgroundColor: cat.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Transactions ──────────────────────────────────── */}
          <div className="rounded-lg overflow-hidden" style={{ background: '#111111', border: '1px solid #1f1f1f' }}>
            <div className="flex justify-between items-center p-5" style={{ borderBottom: '1px solid #1f1f1f' }}>
              <h2 className="text-sm font-semibold text-[#f1f5f9]">Recent Transactions</h2>
              <button className="text-xs text-[#6b7280] font-medium px-3 py-1.5 rounded-md transition-colors"
                      style={{ border: '1px solid #1f1f1f' }}>
                Export CSV
              </button>
            </div>

            {/* This Month */}
            <div className="px-5 py-2 text-xs font-medium text-[#6b7280] uppercase tracking-wider"
                 style={{ background: '#0a0a0a', borderBottom: '1px solid #1f1f1f' }}>
              This Month
            </div>
            <div>
              {transactionsThisMonth.map((tx, i) => (
                <div key={tx.id} className="flex items-center justify-between p-4 group transition-colors"
                     style={{ borderBottom: i < transactionsThisMonth.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#6b7280] mr-4"
                         style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#f1f5f9]">{tx.merchant}</div>
                      <div className="text-xs text-[#6b7280] mt-0.5">{tx.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[#60a5fa] text-[10px] font-medium hidden sm:inline-block"
                          style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
                      {tx.category}
                    </span>
                    <div className="font-semibold text-sm text-[#f1f5f9] w-20 text-right">
                      ${tx.amount.toFixed(2)}
                    </div>
                    <button className="text-[#6b7280] opacity-0 group-hover:opacity-100 hover:text-[#f1f5f9] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Earlier */}
            <div className="px-5 py-2 text-xs font-medium text-[#6b7280] uppercase tracking-wider"
                 style={{ background: '#0a0a0a', borderTop: '1px solid #1f1f1f', borderBottom: '1px solid #1f1f1f' }}>
              Earlier
            </div>
            <div>
              {transactionsEarlier.map((tx, i) => (
                <div key={tx.id} className="flex items-center justify-between p-4 group transition-colors"
                     style={{ borderBottom: i < transactionsEarlier.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#6b7280] mr-4"
                         style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#f1f5f9]">{tx.merchant}</div>
                      <div className="text-xs text-[#6b7280] mt-0.5">{tx.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[#60a5fa] text-[10px] font-medium hidden sm:inline-block"
                          style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
                      {tx.category}
                    </span>
                    <div className="font-semibold text-sm text-[#f1f5f9] w-20 text-right">
                      ${tx.amount.toFixed(2)}
                    </div>
                    <button className="text-[#6b7280] opacity-0 group-hover:opacity-100 hover:text-[#f1f5f9] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ── FAB ──────────────────────────────────────────────── */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#2563eb] text-white rounded-full flex items-center justify-center hover:bg-[#1d4ed8] transition-all duration-200"
              style={{ boxShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
