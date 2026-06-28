import { Link } from '@inertiajs/react';
import Layout from '../components/Layout';

interface ClaimWithReport {
    id: number;
    message: string;
    status: string;
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
                        <p className="text-4xl mb-3">🤝</p>
                        <p className="text-[#0F172A] font-medium">Belum ada klaim</p>
                        <p className="text-sm text-[#64748B] mt-1">Kamu belum pernah mengajukan klaim barang</p>
                        <Link href="/lost-items" className="mt-4 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline">
                            Lihat Barang Hilang
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {claims.map((claim) => {
                            const cfg = STATUS_CONFIG[claim.status] ?? { label: claim.status, className: 'bg-slate-50 text-slate-500 border border-slate-100' };
                            return (
                                <div key={claim.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <Link href={`/reports/${claim.report.id}`} className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] no-underline transition-colors">
                                            {claim.report.title}
                                        </Link>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}>
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#64748B]">{claim.message}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}