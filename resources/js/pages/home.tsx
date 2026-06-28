import { Link } from '@inertiajs/react';
import Layout from '../components/Layout';

interface ReportItem {
    id: number;
    title: string;
    type: string;
    location: string;
    status: string;
}

interface AuthUser {
    id: number;
    name: string;
}

interface HomeProps {
    reports: ReportItem[];
    auth: { user: AuthUser | null };
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    hilang: { label: 'Hilang', className: 'bg-red-50 text-red-600 border border-red-100' },
    ditemukan: { label: 'Ditemukan', className: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    diklaim: { label: 'Diklaim', className: 'bg-blue-50 text-blue-600 border border-blue-100' },
    selesai: { label: 'Selesai', className: 'bg-slate-50 text-slate-500 border border-slate-100' },
};

export default function Home({ reports, auth }: HomeProps) {
    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[#0F172A]">Beranda</h1>
                    <p className="text-sm text-[#64748B] mt-0.5">Laporan barang hilang dan ditemukan terbaru</p>
                </div>

                {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-[#0F172A] font-medium">Belum ada laporan</p>
                        <p className="text-sm text-[#64748B] mt-1">Jadilah yang pertama melaporkan barang hilang atau temuan</p>
                        <Link href="/create-report" className="mt-4 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline">
                            + Lapor Barang
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {reports.map((report) => {
                            const cfg = STATUS_CONFIG[report.status] ?? { label: report.status, className: 'bg-slate-50 text-slate-500 border border-slate-100' };
                            return (
                                <Link
                                    key={report.id}
                                    href={`/reports/${report.id}`}
                                    className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:shadow-md hover:border-[#2563EB]/30 transition-all no-underline group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}>
                                            {cfg.label}
                                        </span>
                                        <span className="text-xs text-[#94A3B8]">{report.type === 'lost' ? '🔍' : '✓'}</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1.5">
                                        {report.title}
                                    </h3>
                                    <p className="text-xs text-[#64748B] flex items-center gap-1">
                                        <span>📍</span> {report.location}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}