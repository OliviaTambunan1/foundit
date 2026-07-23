import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Search,
    PackageCheck,
    ClipboardList,
    Handshake,
    Settings,
    Plus,
    LogOut,
    MapPin
} from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    user: { id: number; name: string } | null;
}

const NAV_ITEMS = [
    { href: '/dashboard-stats', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/lost-items', label: 'Barang Hilang', icon: Search },
    { href: '/found-items', label: 'Barang Ditemukan', icon: PackageCheck },
    { href: '/my-reports', label: 'Laporan Saya', icon: ClipboardList },
    { href: '/my-claims', label: 'Klaim Saya', icon: Handshake },
    { href: '/settings', label: 'Pengaturan', icon: Settings },
];

export default function Layout({ children, user }: LayoutProps) {
    const { url } = usePage();

    function handleLogout(e: React.FormEvent) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className="w-56 bg-[#1E3A5F] flex flex-col fixed h-full z-20">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-[#2A4A72]">
                    <Link href={user ? '/home' : '/'} className="flex items-center gap-2.5 no-underline">
                        <span className="font-semibold text-white text-[16px] tracking-tight">FoundIT</span>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
                {user ? (
                    NAV_ITEMS.map((item) => {
                        const isActive = url === item.href || url.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all no-underline ${
                                    isActive
                                        ? 'bg-[#2563EB] text-white font-medium'
                                        : 'text-[#93B4D4] hover:bg-[#2A4A72] hover:text-white'
                                }`}
                            >
                                <item.icon size={15} className="opacity-80 flex-shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })
                ) : (
                    <>
                        <Link href="/lost-items" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#93B4D4] hover:bg-[#2A4A72] hover:text-white transition-all no-underline">
                            <Search size={15} className="opacity-80 flex-shrink-0" />
                            Barang Hilang
                        </Link>
                        <Link href="/found-items" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#93B4D4] hover:bg-[#2A4A72] hover:text-white transition-all no-underline">
                            <PackageCheck size={15} className="opacity-80 flex-shrink-0" />
                            Barang Ditemukan
                        </Link>
                    </>
                )}
                </nav>

                {/* Bottom */}
                <div className="px-3 pb-5 flex flex-col gap-2 border-t border-[#2A4A72] pt-3">
                    {user ? (
                        <>
                            <Link
                                href="/create-report"
                                className="flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors no-underline"
                            >
                                <Plus size={14} />
                                Lapor Barang
                            </Link>
                            <div className="flex items-center justify-between px-1 mt-1">
                                <span className="text-xs text-[#93B4D4] truncate max-w-[110px]">{user.name}</span>
                                <form onSubmit={handleLogout}>
                                    <button type="submit" className="flex items-center gap-1 text-xs text-[#93B4D4] hover:text-red-400 transition-colors">
                                        <LogOut size={12} />
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <a href="/login" className="flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors no-underline">
                            Login
                            </a>
                            <a href="/register" className="flex items-center justify-center border border-[#2A4A72] text-[#93B4D4] text-sm px-3 py-2 rounded-lg hover:bg-[#2A4A72] hover:text-white transition-colors no-underline">
                                Register
                            </a>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 ml-56 min-h-screen">
                {children}
            </main>
        </div>
    );
}