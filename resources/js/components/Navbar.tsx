import { Link, router } from '@inertiajs/react';

interface NavbarProps {
    user: { id: number; name: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
    function handleLogout(e: React.FormEvent) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-6">
                <Link href="/" className="font-semibold text-gray-900 text-lg">
                    Lost & Found
                </Link>
                <Link href="/lost-items" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Barang Hilang
                </Link>
                <Link href="/found-items" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Barang Ditemukan
                </Link>
                {user && (
                    <Link href="/dashboard-stats" className="text-sm text-gray-600 hover:text-gray-900 transition">
                        Dashboard
                    </Link>
                )}
                {user && (
                    <Link href="/my-reports" className="text-sm text-gray-600 hover:text-gray-900 transition">
                        Laporan Saya
                    </Link>
                )}
                {user && (
                    <Link href="/my-claims" className="text-sm text-gray-600 hover:text-gray-900 transition">
                        Klaim Saya
                    </Link>
                )}
            </div>

            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        {user && (
                            <Link
                                href="/create-report"
                                className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition"
                            >
                                + Lapor Barang
                            </Link>
                        )}
                        <span className="text-sm text-gray-500">Halo, {user.name}</span>
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="text-sm text-gray-600 hover:text-red-600 transition">
                                Logout
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}