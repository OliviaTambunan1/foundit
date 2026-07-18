import { Link } from '@inertiajs/react';
import Layout from '../components/Layout';
import { formatDate } from '../lib/formatDate';

interface Stats {
    total_reports: number;
    total_lost: number;
    total_found: number;
    total_claimed: number;
    total_in_progress: number;
    total_resolved: number;
    my_reports: number;
    my_pending_claims: number;
    claims_to_review: number;
}

interface RecentReport {
    id: number;
    title: string;
    type: string;
    status: string;
    location: string;
    created_at: string;
}

interface AuthUser {
    id: number;
    name: string;
}

interface DashboardProps {
    stats: Stats;
    recentReports: RecentReport[];
    auth: { user: AuthUser | null };
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    hilang: { label: 'Hilang', className: 'bg-red-50 text-red-600 border border-red-100' },
    ditemukan: { label: 'Ditemukan', className: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    diklaim: { label: 'Diklaim', className: 'bg-blue-50 text-blue-600 border border-blue-100' },
    selesai: { label: 'Selesai', className: 'bg-slate-50 text-slate-500 border border-slate-100' },
};

function StatCard({ label, value, sub, highlight }: {
    label: string;
    value: number;
    sub?: string;
    highlight?: string;
}) {
    return (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:shadow-sm transition-shadow">
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-3">{label}</p>
            <p className={`text-3xl font-semibold ${highlight ?? 'text-[#0F172A]'}`}>{value}</p>
            {sub && <p className="text-xs text-[#94A3B8] mt-1.5">{sub}</p>}
        </div>
    );
}

export default function DashboardStats({ stats, recentReports, auth }: DashboardProps) {
    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-[#0F172A]">Dashboard</h1>
                        <p className="text-sm text-[#64748B] mt-0.5">
                            Pantau laporan barang hilang dan temuan di kampus
                        </p>
                    </div>
                    <Link
                        href="/create-report"
                        className="flex items-center gap-1.5 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline"
                    >
                        + Lapor Barang
                    </Link>
                </div>

                {/* Alert klaim pending */}
                {stats.claims_to_review > 0 && (
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-6">
                        <span className="text-amber-500 text-lg mt-0.5">🔔</span>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-amber-800">
                                {stats.claims_to_review} klaim menunggu review kamu
                            </p>
                            <p className="text-xs text-amber-600 mt-0.5">
                                Periksa bukti dan approve atau tolak klaim yang masuk.
                            </p>
                        </div>
                        <Link
                            href="/my-reports"
                            className="text-xs font-semibold text-amber-700 hover:text-amber-900 no-underline whitespace-nowrap mt-0.5"
                        >
                            Review →
                        </Link>
                    </div>
                )}

                {/* Stat Cards */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                    <StatCard
                        label="Total Aktif"
                        value={stats.total_reports}
                        sub="semua laporan aktif"
                    />
                    <StatCard
                        label="Barang Hilang"
                        value={stats.total_lost}
                        sub="menunggu ditemukan"
                        highlight="text-red-500"
                    />
                    <StatCard
                        label="Barang Ditemukan"
                        value={stats.total_found}
                        sub="menunggu diklaim"
                        highlight="text-emerald-600"
                    />
                    <StatCard
                        label="Sedang Diklaim"
                        value={stats.total_claimed}
                        sub="dalam proses serah terima"
                        highlight="text-amber-500"
                    />
                    <StatCard
                        label="Sudah Selesai"
                        value={stats.total_resolved}
                        sub="berhasil dikembalikan"
                        highlight="text-[#2563EB]"
                    />
                </div>

                {/* Tabel Laporan Terbaru */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
                        <h2 className="text-sm font-semibold text-[#0F172A]">Laporan Terbaru</h2>
                        <Link
                            href="/lost-items"
                            className="text-xs text-[#2563EB] hover:text-[#1D4ED8] no-underline font-medium"
                        >
                            Lihat Semua →
                        </Link>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Barang</th>
                                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Status</th>
                                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Lokasi</th>
                                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Dilaporkan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentReports.map((report, i) => {
                                const cfg = STATUS_CONFIG[report.status] ?? {
                                    label: report.status,
                                    className: 'bg-slate-50 text-slate-500 border border-slate-100',
                                };
                                return (
                                    <tr
                                        key={report.id}
                                        className={`hover:bg-[#F8FAFC] transition-colors ${i !== recentReports.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}
                                    >
                                        <td className="px-6 py-3.5">
                                            <Link
                                                href={`/reports/${report.id}`}
                                                className="text-sm font-medium text-[#0F172A] hover:text-[#2563EB] no-underline transition-colors"
                                            >
                                                {report.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}>
                                                {cfg.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-[#64748B]">
                                            {report.location}
                                        </td>
                                        <td className="px-6 py-3.5 text-xs text-[#94A3B8]">
                                            {formatDate(report.created_at)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> 
                </div>
            </div>
        </Layout>
    );
}