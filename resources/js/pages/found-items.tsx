import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '../components/Layout';

interface ReportItem {
    id: number;
    title: string;
    description: string | null;
    location: string;
    category: string;
    status: string;
}

interface AuthUser {
    id: number;
    name: string;
}

interface FoundItemsProps {
    reports: ReportItem[];
    filters: { search?: string; category?: string };
    categories: string[];
    auth: { user: AuthUser | null };
}

export default function FoundItems({ reports, filters, categories, auth }: FoundItemsProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');

    function applyFilter(e: React.FormEvent) {
        e.preventDefault();
        router.get('/found-items', { search, category }, { preserveState: true });
    }

    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-[#0F172A]">Barang Ditemukan</h1>
                        <p className="text-sm text-[#64748B] mt-0.5">{reports.length} laporan ditemukan</p>
                    </div>
                </div>

                <form onSubmit={applyFilter} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Cari judul atau lokasi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        Cari
                    </button>
                </form>

                {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-4xl mb-3">📦</p>
                        <p className="text-[#0F172A] font-medium">Tidak ada laporan yang cocok</p>
                        <p className="text-sm text-[#64748B] mt-1">Coba ubah kata kunci atau kategori pencarian</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {reports.map((report) => (
                            <Link
                                key={report.id}
                                href={`/reports/${report.id}`}
                                className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:shadow-md hover:border-[#2563EB]/30 transition-all no-underline group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                                        Ditemukan
                                    </span>
                                    <span className="text-xs text-[#94A3B8] bg-[#F8FAFC] px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                                        {report.category}
                                    </span>
                                </div>
                                <h3 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1.5">
                                    {report.title}
                                </h3>
                                <p className="text-xs text-[#94A3B8] mb-2 line-clamp-2">
                                    {report.description ?? 'Tidak ada deskripsi'}
                                </p>
                                <p className="text-xs text-[#64748B] flex items-center gap-1">
                                    <span>📍</span> {report.location}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}