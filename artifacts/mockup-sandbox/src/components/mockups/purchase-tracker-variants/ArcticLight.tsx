import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
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
  { name: 'Groceries', value: 850, color: 'rgba(37, 99, 235, 1)' },
  { name: 'Dining', value: 540, color: 'rgba(37, 99, 235, 0.8)' },
  { name: 'Transport', value: 320, color: 'rgba(37, 99, 235, 0.6)' },
  { name: 'Utilities', value: 240, color: 'rgba(37, 99, 235, 0.4)' },
  { name: 'Entertainment', value: 180, color: 'rgba(37, 99, 235, 0.2)' },
];

const transactionsThisMonth = [
  { id: 1, merchant: 'Whole Foods Market', category: 'Groceries', date: 'Oct 24, 2023', amount: 142.50 },
  { id: 2, merchant: 'Uber', category: 'Transport', date: 'Oct 23, 2023', amount: 24.00 },
  { id: 3, merchant: 'Netflix', category: 'Entertainment', date: 'Oct 21, 2023', amount: 15.99 },
];

const transactionsEarlier = [
  { id: 4, merchant: 'Sweetgreen', category: 'Dining', date: 'Oct 18, 2023', amount: 18.50 },
  { id: 5, merchant: 'Con Edison', category: 'Utilities', date: 'Oct 15, 2023', amount: 104.20 },
  { id: 6, merchant: 'Trader Joe\'s', category: 'Groceries', date: 'Oct 12, 2023', amount: 89.30 },
];

export default function ArcticLight() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#fafafa] border-r border-[#e5e7eb] flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-[#e5e7eb]">
            <div className="w-7 h-7 bg-[#2563eb] rounded flex items-center justify-center text-white font-bold text-sm tracking-tight mr-3">
              PT
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#0f172a]">Purchase Tracker</span>
          </div>

          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-[#eff6ff] text-[#2563eb] border-l-2 border-[#2563eb]">
              <LayoutDashboard className="w-4 h-4 mr-3" />
              Overview
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]">
              <ShoppingBag className="w-4 h-4 mr-3" />
              Transactions
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]">
              <BarChart2 className="w-4 h-4 mr-3" />
              Analytics
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]">
              <Target className="w-4 h-4 mr-3" />
              Budgets
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]">
              <Tag className="w-4 h-4 mr-3" />
              Categories
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-[#e5e7eb]">
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] mb-4">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </a>
          <div className="flex items-center px-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden mr-3">
              <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">John Doe</span>
              <span className="text-[10px] text-[#94a3b8]">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-8">
          <div>
            <h1 className="text-lg font-medium tracking-tight text-[#0f172a]">Good morning, John.</h1>
            <p className="text-xs text-[#475569]">Here's your spending overview for October.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-[#94a3b8] hover:text-[#0f172a]">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-[#94a3b8] hover:text-[#0f172a]">
              <Bell className="w-5 h-5" />
            </button>
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Purchase
            </button>
          </div>
        </header>

        <div className="p-8 space-y-6 flex-1 overflow-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-[#e5e7eb] shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#475569] uppercase tracking-wider">Total Spent</span>
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#0f172a] mb-2">$2,130.50</div>
              <div className="flex items-center text-xs">
                <span className="flex items-center text-[#dc2626] font-medium bg-red-50 px-1.5 py-0.5 rounded mr-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </span>
                <span className="text-[#94a3b8]">vs last month</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#e5e7eb] shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#475569] uppercase tracking-wider">Transactions</span>
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#0f172a] mb-2">42</div>
              <div className="flex items-center text-xs">
                <span className="flex items-center text-[#059669] font-medium bg-green-50 px-1.5 py-0.5 rounded mr-2">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -4.2%
                </span>
                <span className="text-[#94a3b8]">vs last month</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#e5e7eb] shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#475569] uppercase tracking-wider">Top Category</span>
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
                  <Tag className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#0f172a] mb-2">Groceries</div>
              <div className="flex items-center text-xs">
                <span className="text-[#475569] font-medium mr-2">$850 spent</span>
                <span className="text-[#94a3b8]">39% of total</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#e5e7eb] shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-[#475569] uppercase tracking-wider">Active Subs</span>
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#0f172a] mb-2">8</div>
              <div className="flex items-center text-xs">
                <span className="text-[#475569] font-medium mr-2">$112.50/mo</span>
                <span className="text-[#94a3b8]">recurring</span>
              </div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#e5e7eb] shadow-sm lg:col-span-3">
              <h2 className="text-sm font-semibold text-[#0f172a] mb-6">Spending Over Time</h2>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#94a3b8' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
                      itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#e5e7eb] shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-[#0f172a]">Top Categories</h2>
                <button className="text-xs text-[#2563eb] font-medium hover:text-[#1d4ed8] flex items-center">
                  View All <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {categoryData.map((cat, index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#475569]">{cat.name}</span>
                      <span className="font-semibold text-[#0f172a]">${cat.value}</span>
                    </div>
                    <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${(cat.value / 850) * 100}%`, backgroundColor: cat.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-[#e5e7eb]">
              <h2 className="text-sm font-semibold text-[#0f172a]">Recent Transactions</h2>
              <button className="text-xs text-[#475569] font-medium border border-[#e5e7eb] px-3 py-1.5 rounded-md hover:bg-[#f8fafc]">
                Export CSV
              </button>
            </div>
            
            <div>
              <div className="px-5 py-2 bg-[#f8fafc] border-b border-[#f1f5f9] text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                This Month
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {transactionsThisMonth.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-[#f8fafc] transition-colors group">
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#475569] mr-4 border border-[#e5e7eb]">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0f172a]">{tx.merchant}</div>
                        <div className="text-xs text-[#94a3b8] flex items-center mt-0.5">
                          {tx.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] text-[10px] font-medium border border-blue-100 hidden sm:inline-block">
                        {tx.category}
                      </span>
                      <div className="font-semibold text-sm text-[#0f172a] w-20 text-right">
                        ${tx.amount.toFixed(2)}
                      </div>
                      <button className="text-[#94a3b8] opacity-0 group-hover:opacity-100 hover:text-[#0f172a] transition-opacity">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-2 bg-[#f8fafc] border-b border-t border-[#f1f5f9] text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                Earlier
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {transactionsEarlier.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-[#f8fafc] transition-colors group">
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#475569] mr-4 border border-[#e5e7eb]">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0f172a]">{tx.merchant}</div>
                        <div className="text-xs text-[#94a3b8] flex items-center mt-0.5">
                          {tx.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] text-[10px] font-medium border border-blue-100 hidden sm:inline-block">
                        {tx.category}
                      </span>
                      <div className="font-semibold text-sm text-[#0f172a] w-20 text-right">
                        ${tx.amount.toFixed(2)}
                      </div>
                      <button className="text-[#94a3b8] opacity-0 group-hover:opacity-100 hover:text-[#0f172a] transition-opacity">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#2563eb] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1d4ed8] hover:-translate-y-1 transition-all duration-200">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
