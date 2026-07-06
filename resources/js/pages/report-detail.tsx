import { useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { MapPin, CheckCircle } from 'lucide-react';

interface Claimer {
    id: number;
    name: string;
    phone: string | null;
}

interface ClaimItem {
    id: number;
    message: string;
    photo: string | null;
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

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    hilang: { label: 'Hilang', className: 'bg-red-50 text-red-600 border border-red-100' },
    ditemukan: { label: 'Ditemukan', className: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    diklaim: { label: 'Diklaim', className: 'bg-blue-50 text-blue-600 border border-blue-100' },
    selesai: { label: 'Selesai', className: 'bg-slate-50 text-slate-500 border border-slate-100' },
};

export default function ReportDetail({ report, auth }: ReportDetailProps) {
    const isOwner = auth.user && auth.user.id === report.user_id;
    const hasAlreadyClaimed = auth.user && report.claims.some((c) => c.claimer.id === auth.user!.id);
    const myApprovedClaim = report.claims.find(
        (c) => c.status === 'approved' && auth.user && c.claimer.id === auth.user.id
    );
    const isResolved = report.status === 'selesai';

    // Label & placeholder dinamis berdasarkan tipe laporan
    const claimLabel = report.type === 'lost'
        ? 'Saya Menemukan Barang Ini'
        : 'Ini Barang Saya';
    const claimPlaceholder = report.type === 'lost'
        ? 'Ceritakan di mana dan kapan kamu menemukannya, serta kondisi barang...'
        : 'Jelaskan bukti kepemilikan atau ciri khas barang yang hanya kamu ketahui...';
    const claimSectionTitle = report.type === 'lost'
        ? 'Saya Menemukan Barang Ini'
        : 'Ajukan Klaim Kepemilikan';
    const claimListTitle = report.type === 'lost'
        ? 'Laporan Penemuan Masuk'
        : 'Klaim Masuk';
    const contactLabel = report.type === 'lost'
        ? 'Laporan penemuanmu dikonfirmasi! Hubungi pemilik untuk serah terima:'
        : 'Klaim kepemilikanmu disetujui! Hubungi penemu untuk serah terima:';


        const { data, setData, post, processing, errors, reset } = useForm<{
    message: string;
    photo: File | null;
}>({
    message: '',
    photo: null,
});

function handleClaimSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(`/reports/${report.id}/claims`, {
        forceFormData: true,
        onSuccess: () => reset(),
    });
}

    const statusCfg = STATUS_CONFIG[report.status] ?? {
        label: report.status,
        className: 'bg-slate-50 text-slate-500 border border-slate-100',
    };

    // Tombol Tandai Selesai muncul kalau:
    // pemilik + (status diklaim ATAU status lain selain selesai — buat kasus nemu sendiri)
    const canResolve = isOwner && !isResolved;

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
                    {canResolve && <ResolveButton reportId={report.id} />}
                </div>

                {/* Foto */}
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
                            <p className="text-sm text-[#0F172A] font-medium flex items-center gap-1.5">
                            <MapPin size={13} className="text-[#94A3B8]" /> {report.location} </p>
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

                {/* Kontak terbuka setelah approved — untuk pihak yang klaim/lapor temuan */}
                {myApprovedClaim && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5">
                        <p className="text-sm font-semibold text-emerald-800 mb-1">✓ Dikonfirmasi!</p>
                        <p className="text-sm text-emerald-700 mb-3">{contactLabel}</p>
                        {report.user.phone ? (
                            
                            <a
                                href={`https://wa.me/${report.user.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline"
                            >
                                💬 Hubungi {report.user.name} via WhatsApp
                            </a>
                        ) : (
                            <p className="text-sm text-emerald-600">
                                {report.user.name} belum mencantumkan nomor WA.
                            </p>
                        )}
                    </div>
                )}

                {/* Form Klaim / Lapor Temuan */}
                {!isOwner && !hasAlreadyClaimed && auth.user && !isResolved && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-5">
                        <h3 className="text-sm font-semibold text-[#0F172A] mb-1">{claimSectionTitle}</h3>
                        <p className="text-xs text-[#94A3B8] mb-3">
                            {report.type === 'lost'
                                ? 'Informasi ini akan dikirim ke pelapor untuk diverifikasi sebelum kontak dibuka.'
                                : 'Buktimu akan diperiksa penemu sebelum kepemilikan dikonfirmasi.'}
                        </p>

                        <form onSubmit={handleClaimSubmit}>
                            <textarea
                                placeholder={claimPlaceholder}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                rows={3}
                                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none mb-3"
                            />
                            {errors.message && <p className="text-xs text-red-500 mb-2">{errors.message}</p>}

                            <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg px-4 py-4 text-center hover:border-[#2563EB]/50 transition-colors mb-1">
                                <p className="text-xs text-[#94A3B8] mb-2">
                                    {report.type === 'lost'
                                        ? '📷 Foto bukti wajib — upload foto barang yang kamu temukan'
                                        : '📷 Foto opsional — upload foto sebagai bukti tambahan'}
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('photo', e.target.files ? e.target.files[0] : null)}
                                    className="text-xs text-[#64748B]"
                                />
                            </div>
                            {errors.photo && <p className="text-xs text-red-500 mb-2">{errors.photo}</p>}

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-3 bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Mengirim...' : claimLabel}
                            </button>
                        </form>
                    </div>
                )}

                {hasAlreadyClaimed && !isResolved && !myApprovedClaim && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-5">
                        <p className="text-sm text-blue-700">
                            {report.type === 'lost'
                                ? '✓ Laporan penemuanmu sudah terkirim. Tunggu konfirmasi dari pelapor.'
                                : '✓ Klaimmu sudah terkirim. Pantau statusnya di halaman Klaim Saya.'}
                        </p>
                    </div>
                )}

                {/* Daftar Klaim — owner only */}
                {isOwner && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#F1F5F9]">
                            <h3 className="text-sm font-semibold text-[#0F172A]">
                                {claimListTitle} ({report.claims.length})
                            </h3>
                        </div>
                        {report.claims.length === 0 ? (
                            <div className="px-5 py-8 text-center">
                                <p className="text-sm text-[#64748B]">
                                    {report.type === 'lost'
                                        ? 'Belum ada yang melaporkan menemukan barang ini.'
                                        : 'Belum ada yang mengajukan klaim.'}
                                </p>
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
                                                {claim.status === 'approved'
                                                    ? 'Dikonfirmasi'
                                                    : claim.status === 'rejected'
                                                    ? 'Ditolak'
                                                    : 'Menunggu'}
                                            </span>
                                        </div>

                                        <p className="text-sm text-[#64748B] mb-2">{claim.message}</p>
                                        {claim.photo && (
                                            <div className="mt-2 mb-2">
                                                <img
                                                    src={`/storage/${claim.photo}`}
                                                    alt="Foto bukti"
                                                    className="w-full max-h-32 object-cover rounded-lg border border-[#E2E8F0]"
                                                />
                                            </div>
                                        )}

                                        {claim.status === 'approved' && (
                                            <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2.5 mt-2">
                                                <p className="text-xs text-emerald-700 font-medium mb-1">
                                                    {report.type === 'lost' ? 'Kontak penemu:' : 'Kontak pengklaim:'}
                                                </p>
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