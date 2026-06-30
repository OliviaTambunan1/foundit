import { useForm } from '@inertiajs/react';
import Layout from '../components/Layout';

interface Claimer {
    id: number;
    name: string;
    phone: string | null;
}

interface ClaimItem {
    id: number;
    message: string;
    status: string;
    claimer: Claimer;
}

interface ReportDetail {
    id: number;
    title: string;
    description: string | null;
    location: string;
    category: string;
    type: string;
    status: string;
    photo: string | null;
    user_id: number;
    user: {
        name: string;
        phone: string | null;
    };
    claims: ClaimItem[];
}

interface AuthUser {
    id: number;
    name: string;
}

interface ReportDetailProps {
    report: ReportDetail;
    auth: { user: AuthUser | null };
}

function ClaimActions({ claimId }: { claimId: number }) {
    const { patch, processing } = useForm();
    return (
        <div className="flex gap-2 mt-3">
            <button
                onClick={() => patch(`/claims/${claimId}/approve`)}
                disabled={processing}
                className="bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
                Setujui
            </button>
            <button
                onClick={() => patch(`/claims/${claimId}/reject`)}
                disabled={processing}
                className="border border-[#E2E8F0] text-[#64748B] hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
                Tolak
            </button>
        </div>
    );
}

function ResolveButton({ reportId }: { reportId: number }) {
    const { patch, processing } = useForm();
    return (
        <button
            onClick={() => patch(`/reports/${reportId}/resolve`)}
            disabled={processing}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
            {processing ? 'Memproses...' : '✓ Tandai Selesai'}
        </button>
    );
}

export default function ReportDetail({ report, auth }: ReportDetailProps) {
    const isOwner = auth.user && auth.user.id === report.user_id;
    const hasAlreadyClaimed = auth.user && report.claims.some((c) => c.claimer.id === auth.user!.id);
    const approvedClaim = report.claims.find((c) => c.status === 'approved');
    const myApprovedClaim = report.claims.find(
        (c) => c.status === 'approved' && auth.user && c.claimer.id === auth.user.id
    );

    const { data, setData, post, processing, errors, reset } = useForm({ message: '' });

    function handleClaimSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/reports/${report.id}/claims`, { onSuccess: () => reset() });
    }

    const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
        hilang: { label: 'Hilang', className: 'bg-red-50 text-red-600 border border-red-100' },
        ditemukan: { label: 'Ditemukan', className: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
        diklaim: { label: 'Diklaim', className: 'bg-blue-50 text-blue-600 border border-blue-100' },
        selesai: { label: 'Selesai', className: 'bg-slate-50 text-slate-500 border border-slate-100' },
    };

    const statusCfg = STATUS_CONFIG[report.status] ?? {
        label: report.status,
        className: 'bg-slate-50 text-slate-500 border border-slate-100',
    };

    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7 max-w-3xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.className}`}>
                                {statusCfg.label}
                            </span>
                            <span className="text-xs text-[#94A3B8]">{report.category}</span>
                        </div>
                        <h1 className="text-xl font-semibold text-[#0F172A]">{report.title}</h1>
                    </div>
                    {/* Tombol Tandai Selesai — hanya untuk pemilik, kalau status diklaim */}
                    {isOwner && report.status === 'diklaim' && (
                        <ResolveButton reportId={report.id} />
                    )}
                </div>
                
                {/* Foto Barang */}
                {report.photo && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-5">
                        <img
                            src={`/storage/${report.photo}`}
                            alt={report.title}
                            className="w-full max-h-80 object-cover"
                        />
                    </div>
                )}

                {/* Info Card */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Lokasi</p>
                            <p className="text-sm text-[#0F172A] font-medium">📍 {report.location}</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Dilaporkan oleh</p>
                            <p className="text-sm text-[#0F172A] font-medium">{report.user.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Tipe</p>
                            <p className="text-sm text-[#0F172A] font-medium">
                                {report.type === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Kategori</p>
                            <p className="text-sm text-[#0F172A] font-medium">{report.category}</p>
                        </div>
                    </div>
                    {report.description && (
                        <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
                            <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Deskripsi</p>
                            <p className="text-sm text-[#0F172A]">{report.description}</p>
                        </div>
                    )}
                </div>

                {/* Kontak terbuka setelah approved — untuk pengklaim */}
                {myApprovedClaim && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5">
                        <p className="text-sm font-semibold text-emerald-800 mb-1">✓ Klaim kamu disetujui!</p>
                        <p className="text-sm text-emerald-700 mb-3">
                            Hubungi pemilik barang untuk mengatur serah terima:
                        </p>
                        {report.user.phone ? (
                           
                           <a
                                href={`https://wa.me/${report.user.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline"
                            >
                                💬 Hubungi via WhatsApp
                            </a>
                        ) : (
                            <p className="text-sm text-emerald-600">
                                Pemilik belum mencantumkan nomor WA. Hubungi langsung: <strong>{report.user.name}</strong>
                            </p>
                        )}
                    </div>
                )}

                {/* Form Klaim */}
                {!isOwner && !hasAlreadyClaimed && auth.user && report.status !== 'selesai' && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-5">
                        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Ajukan Klaim</h3>
                        <form onSubmit={handleClaimSubmit}>
                            <textarea
                                placeholder="Jelaskan bukti kepemilikan atau ciri khas barang..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                rows={3}
                                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
                            />
                            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-3 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Mengirim...' : 'Ajukan Klaim'}
                            </button>
                        </form>
                    </div>
                )}

                {hasAlreadyClaimed && report.status !== 'selesai' && !myApprovedClaim && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-5">
                        <p className="text-sm text-blue-700">
                            ✓ Kamu sudah mengajukan klaim. Pantau statusnya di halaman Klaim Saya.
                        </p>
                    </div>
                )}

                {/* Daftar Klaim — owner only */}
                {isOwner && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#F1F5F9]">
                            <h3 className="text-sm font-semibold text-[#0F172A]">
                                Klaim Masuk ({report.claims.length})
                            </h3>
                        </div>
                        {report.claims.length === 0 ? (
                            <div className="px-5 py-8 text-center">
                                <p className="text-sm text-[#64748B]">Belum ada yang mengajukan klaim.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#F1F5F9]">
                                {report.claims.map((claim) => (
                                    <div key={claim.id} className="px-5 py-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium text-[#0F172A]">{claim.claimer.name}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                claim.status === 'approved'
                                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    : claim.status === 'rejected'
                                                    ? 'bg-red-50 text-red-600 border border-red-100'
                                                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                                {claim.status === 'approved' ? 'Disetujui' : claim.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#64748B] mb-2">{claim.message}</p>

                                        {/* Kontak pengklaim — muncul ke pemilik setelah approve */}
                                        {claim.status === 'approved' && (
                                            <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2.5 mt-2">
                                                <p className="text-xs text-emerald-700 font-medium mb-1">Kontak pengklaim:</p>
                                                {claim.claimer.phone ? (
                                                    
                                                    <a
                                                        href={`https://wa.me/${claim.claimer.phone.replace(/\D/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-colors no-underline font-medium"
                                                    >
                                                        💬 WhatsApp {claim.claimer.name}
                                                    </a>
                                                ) : (
                                                    <p className="text-xs text-emerald-600">
                                                        {claim.claimer.name} belum mencantumkan nomor WA.
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {claim.status === 'pending' && <ClaimActions claimId={claim.id} />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}