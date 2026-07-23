import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/register');
    }

    const inputClass = "w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]";
    const labelClass = "block text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1.5";

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <span className="font-semibold text-[#0F172A] text-xl tracking-tight">FoundIT</span>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">
                    <h1 className="text-lg font-semibold text-[#0F172A] mb-1">Buat akun baru</h1>
                    <p className="text-sm text-[#64748B] mb-6">Mulai lapor dan temukan barangmu</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className={labelClass}>Nama</label>
                            <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} autoFocus className={inputClass} />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Email</label>
                            <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Nomor WhatsApp</label>
                            <input
                                type="text"
                                placeholder="628123456789"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className={inputClass}
                            />
                            <p className="text-xs text-[#94A3B8] mt-1">Opsional, dipakai saat klaim disetujui</p>
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Password</label>
                            <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className={inputClass} />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Konfirmasi Password</label>
                            <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className={inputClass} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-1"
                        >
                            {processing ? 'Memproses...' : 'Daftar'}
                        </button>
                    </form>

                    <div className="text-center mt-5 pt-5 border-t border-[#F1F5F9]">
                        <a href="/login" className="text-xs text-[#2563EB] hover:text-[#1D4ED8] no-underline font-medium">
                            Sudah punya akun? Masuk
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}