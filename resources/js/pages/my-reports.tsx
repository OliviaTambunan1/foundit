import { Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import Layout from '../components/Layout';
import { formatDate } from '../lib/formatDate';

interface ReportItem {
    id: number;
    title: string;
    type: string;
    status: string;
    created_at: string;
}

interface AuthUser {
    id: number;
    name: string;
}

interface MyReportsProps {
    reports: ReportItem[];
    auth: { user: AuthUser | null };
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    hilang: { label: 'Hilang', className: 'bg-red-50 text-red-600 border border-red-100' },
    ditemukan: { label: 'Ditemukan', className: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    diklaim: { label: 'Diklaim', className: 'bg-blue-50 text-blue-600 border border-blue-100' },
    selesai: { label: 'Selesai', className: 'bg-slate-50 text-slate-500 border border-slate-100' },
};

export default function MyReports({ reports, auth }: MyReportsProps) {
    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-[#0F172A]">Laporan Saya</h1>
                        <p className="text-sm text-[#64748B] mt-0.5">Kelola laporan barang yang kamu buat</p>
                    </div>
                    <Link href="/create-report" className="bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline">
                        + Lapor Barang
                    </Link>
                </div>

                {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <ClipboardList size={40} className="text-[#CBD5E1] mb-3" />
                        <p className="text-[#0F172A] font-medium">Belum ada laporan</p>
                        <p className="text-sm text-[#64748B] mt-1">Kamu belum membuat laporan apapun</p>
                        <Link href="/create-report" className="mt-4 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline">
                            + Lapor Sekarang
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Judul</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Tipe</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Status</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Dilaporkan</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, i) => {
                                    const cfg = STATUS_CONFIG[report.status] ?? { label: report.status, className: 'bg-slate-50 text-slate-500 border border-slate-100' };
                                    return (
                                        <tr key={report.id} className={`hover:bg-[#F8FAFC] transition-colors ${i !== reports.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                                            <td className="px-6 py-3.5">
                                                <Link href={`/reports/${report.id}`} className="text-sm font-medium text-[#0F172A] hover:text-[#2563EB] no-underline transition-colors">
                                                    {report.title}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-3.5 text-sm text-[#64748B]">
                                                {report.type === 'lost' ? 'Hilang' : 'Ditemukan'}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}>
                                                    {cfg.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 text-xs text-[#94A3B8]">
                                                {formatDate(report.created_at)}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <Link href={`/reports/${report.id}/edit`} className="text-xs text-[#2563EB] hover:text-[#1D4ED8] no-underline font-medium">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}