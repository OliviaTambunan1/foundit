import { useForm } from '@inertiajs/react';
import Layout from '../components/Layout';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

interface SettingsProps {
    auth: { user: AuthUser | null };
    user: AuthUser;
}

export default function Settings({ auth, user }: SettingsProps) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        phone: user.phone ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch('/settings');
    }

    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7 max-w-lg">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[#0F172A]">Pengaturan Akun</h1>
                    <p className="text-sm text-[#64748B] mt-0.5">Kelola informasi akun kamu</p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
                    <h2 className="text-sm font-semibold text-[#0F172A] mb-1">Informasi Akun</h2>
                    <p className="text-xs text-[#94A3B8] mb-4">Nomor WA digunakan untuk dihubungi jika klaim disetujui</p>

                    <div className="mb-4 pb-4 border-b border-[#F1F5F9]">
                        <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Nama</p>
                        <p className="text-sm text-[#0F172A] font-medium">{user.name}</p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-[#F1F5F9]">
                        <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Email</p>
                        <p className="text-sm text-[#0F172A] font-medium">{user.email}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1.5">
                                Nomor WhatsApp
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Contoh: 08123456789 atau 628123456789"
                                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                            />
                            <p className="text-xs text-[#94A3B8] mt-1">
                                Format apapun diterima: 08xxx, 628xxx, atau +628xxx
                            </p>
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>

                        {recentlySuccessful && (
                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm px-4 py-2.5 rounded-lg mb-4">
                                ✓ Nomor WhatsApp berhasil diperbarui.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}