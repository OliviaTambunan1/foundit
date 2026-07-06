import { useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { Camera } from 'lucide-react';

interface AuthUser {
    id: number;
    name: string;
}

interface CreateReportProps {
    auth: { user: AuthUser | null };
    categories: string[];
}

export default function CreateReport({ auth, categories }: CreateReportProps) {
    const { data, setData, post, processing, errors } = useForm({
        type: 'lost',
        title: '',
        description: '',
        category: '',
        location: '',
        photo: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/reports', { forceFormData: true });
    }

    const inputClass = "w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white";
    const labelClass = "block text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1.5";

    return (
        <Layout user={auth.user}>
            <div className="px-8 py-7 max-w-xl">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[#0F172A]">Lapor Barang</h1>
                    <p className="text-sm text-[#64748B] mt-0.5">Isi detail barang yang hilang atau kamu temukan</p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className={labelClass}>Tipe Laporan</label>
                            <div className="flex gap-2">
                                {['lost', 'found'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setData('type', t)}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                            data.type === t
                                                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                                                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
                                        }`}
                                    >
                                        {t === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Judul</label>
                            <input
                                type="text"
                                placeholder="Contoh: Dompet kulit warna coklat"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={inputClass}
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Kategori</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className={inputClass}
                            >
                                <option value="">-- Pilih Kategori --</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Lokasi</label>
                            <input
                                type="text"
                                placeholder="Contoh: Kantin Gedung A"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={inputClass}
                            />
                            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Deskripsi</label>
                            <textarea
                                placeholder="Ciri-ciri barang, kondisi terakhir, dll..."
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Foto (opsional)</label>
                            <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg px-4 py-6 text-center hover:border-[#2563EB]/50 transition-colors">
                               <p className="text-sm text-[#94A3B8] mb-2 flex items-center justify-center gap-1.5">
                                <Camera size={14} /> Klik untuk upload foto
                                    </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('photo', e.target.files ? e.target.files[0] : null)}
                                    className="text-xs text-[#64748B]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#1E3A5F] hover:bg-[#2563EB] text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Laporan'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}