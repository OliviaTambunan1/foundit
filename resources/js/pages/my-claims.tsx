import { Link } from '@inertiajs/react';
import { Handshake } from 'lucide-react';
import Layout from '../components/Layout';
import { formatDate } from '../lib/formatDate';

interface ClaimWithReport {
    id: number;
    message: string;
    status: string;
    created_at: string;
    report: {
        id: number;
        title: string;
        type: string;
    };
}

interface AuthUser {
    id: number;
    name: string;
}

interface MyClaimsProps {
    claims: ClaimWithReport[];
    auth: { user: AuthUser | null };
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    pending: { label: 'Menunggu', className: 'bg-amber-50 text-amber-600 border border-amber-100' },
    approved: { label: 'Disetujui', className: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    rejected: { label: 'Ditolak', className: 'bg-red-50 text-red-600 border border-red-100' },
};

export default function MyClaims({ claims, auth }: MyClaimsProps) {
    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[#0F172A]">Klaim Saya</h1>
                    <p className="text-sm text-[#64748B] mt-0.5">Riwayat klaim barang yang kamu ajukan</p>
                </div>

                {claims.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Handshake size={40} className="text-[#CBD5E1] mb-3" />
                        <p className="text-[#0F172A] font-medium">Belum ada klaim</p>
                        <p className="text-sm text-[#64748B] mt-1">Kamu belum pernah mengajukan klaim barang</p>
                        <Link href="/lost-items" className="mt-4 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline">
                            Lihat Barang Hilang
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Barang</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Pesan Klaim</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Status</th>
                                    <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wide px-6 py-3">Diajukan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claims.map((claim, i) => {
                                    const cfg = STATUS_CONFIG[claim.status] ?? { label: claim.status, className: 'bg-slate-50 text-slate-500 border border-slate-100' };
                                    return (
                                        <tr key={claim.id} className={`hover:bg-[#F8FAFC] transition-colors ${i !== claims.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                                            <td className="px-6 py-3.5">
                                                <Link href={`/reports/${claim.report.id}`} className="text-sm font-medium text-[#0F172A] hover:text-[#2563EB] no-underline transition-colors">
                                                    {claim.report.title}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-3.5 text-sm text-[#64748B] max-w-xs truncate">
                                                {claim.message}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}>
                                                    {cfg.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 text-xs text-[#94A3B8]">
                                                {formatDate(claim.created_at)}
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