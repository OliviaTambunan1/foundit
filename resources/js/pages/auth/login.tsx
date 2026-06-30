import { useForm, Link } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="w-9 h-9 rounded-lg bg-[#1E3A5F] flex items-center justify-center text-white text-sm font-bold">
                        F
                    </div>
                    <span className="font-semibold text-[#0F172A] text-xl tracking-tight">FoundIT</span>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">
                    <h1 className="text-lg font-semibold text-[#0F172A] mb-1">Masuk ke akunmu</h1>
                    <p className="text-sm text-[#64748B] mb-6">Lapor dan temukan barang hilang di kampus</p>

                    {status && (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm px-4 py-2.5 rounded-lg mb-4">
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1.5">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoFocus
                                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1.5">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-[#64748B]">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-[#E2E8F0]"
                            />
                            Ingat saya
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#F1F5F9]">
                        {canResetPassword && (
                            <a href="/forgot-password" className="text-xs text-[#64748B] hover:text-[#2563EB] no-underline">
                                Lupa password?
                            </a>
                        )}
                        <a href="/register" className="text-xs text-[#2563EB] hover:text-[#1D4ED8] no-underline font-medium ml-auto">
                            Belum punya akun? Daftar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}