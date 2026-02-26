import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  MenuSquare, // Using MenuSquare instead of RestaurantMenu for 'Menu Management'
  Star,
  Settings,
  LogOut,
  Menu,
  ChefHat,
  ChevronRight,
  MailOpen,
} from 'lucide-react';

const CatererLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/caterer', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/caterer/enquiries', icon: MailOpen, badge: 3 },
    { name: 'Menu Management', path: '/caterer/menus', icon: MenuSquare },
    { name: 'Reviews', path: '/caterer/reviews', icon: Star },
    { name: 'Settings', path: '/caterer/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f7f6] text-[#1b160d] font-['Inter',sans-serif] selection:bg-[#ef9d2a]/30">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-stone-200 bg-white transition-transform duration-300 lg:static lg:flex lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'
        } shadow-sm h-full`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          {/* Logo & Menu */}
          <div className="flex flex-col gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ef9d2a]/20 text-[#ef9d2a]">
                <ChefHat className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight text-[#1b160d]">Book Bawarchi</h1>
                <p className="text-xs font-medium text-[#9a794c]">Caterer Admin</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/caterer'} // Active styling strictly for /caterer
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    group flex items-center gap-3 rounded-full px-4 py-3 transition-colors
                    ${
                      isActive
                        ? 'bg-[#ef9d2a]/10 text-[#ef9d2a] font-semibold hover:bg-[#ef9d2a]/20'
                        : 'text-stone-600 font-medium hover:bg-stone-50 hover:text-[#1b160d]'
                    }
                  `}
                >
                  <item.icon
                    className={`w-5 h-5 ${!item.isActive && 'group-hover:text-[#ef9d2a] transition-colors'}`}
                  />
                  <span className="text-sm">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#ef9d2a] text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Profile & Bottom Actions */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="p-4 bg-[#f8f7f6] rounded-2xl flex items-center gap-3 border border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=150"
                alt="Chef Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-[#1b160d]">Chef Arjun</p>
                <p className="text-xs text-[#9a794c] font-medium truncate">Premium Member</p>
              </div>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 bg-stone-100 text-[#1b160d] hover:bg-stone-200 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-bold">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#f8f7f6]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 border-b border-stone-100 lg:hidden">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-[#ef9d2a]" />
            <span className="font-bold text-[#1b160d] text-lg">Book Bawarchi</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex flex-1 flex-col p-6 lg:p-10 max-w-7xl mx-auto w-full pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CatererLayout;
