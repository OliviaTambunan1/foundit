import { Link } from '@inertiajs/react';

export default function Landing() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC', fontFamily: 'sans-serif' }}>

            {/* Navbar */}
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', background: 'white', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#1E3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '13px' }}>F</div>
                    <span style={{ color: '#0F172A', fontWeight: 600, fontSize: '15px' }}>FoundIT</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <a href="/login" style={{ color: '#64748B', fontSize: '13px', textDecoration: 'none' }}>Masuk</a>
                    <a href="/register" style={{ background: '#1E3A5F', color: 'white', fontSize: '13px', fontWeight: 500, padding: '7px 16px', borderRadius: '7px', textDecoration: 'none' }}>Daftar</a>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '72px 32px 64px', background: 'white', borderBottom: '1px solid #E2E8F0' }}>
                <h1 style={{ color: '#0F172A', fontSize: '34px', fontWeight: 600, margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.4px' }}>
                    Sistem lost & found<br />kampus IT Del
                </h1>
                <p style={{ color: '#64748B', fontSize: '15px', margin: '0 auto 32px', maxWidth: '360px', lineHeight: 1.7 }}>
                    Laporkan barang hilang atau temuan kamu. Klaim terverifikasi, aman, dan terdokumentasi.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <a href="/register" style={{ background: '#1E3A5F', color: 'white', fontSize: '14px', fontWeight: 500, padding: '10px 22px', borderRadius: '8px', textDecoration: 'none' }}>
                        Lapor sekarang
                    </a>
                    <Link href="/lost-items" style={{ color: '#0F172A', fontSize: '14px', padding: '10px 22px', borderRadius: '8px', border: '1px solid #E2E8F0', textDecoration: 'none', background: '#F8FAFC' }}>
                        Lihat barang hilang
                    </Link>
                </div>
            </div>

            {/* Cara Kerja */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ padding: '28px 24px', borderRight: '1px solid #E2E8F0' }}>
                    <p style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px' }}>Langkah 1</p>
                    <p style={{ color: '#0F172A', fontSize: '13px', fontWeight: 500, margin: '0 0 6px' }}>Ceritakan barangmu</p>
                    <p style={{ color: '#64748B', fontSize: '12px', margin: 0, lineHeight: 1.7 }}>Isi judul, lokasi, deskripsi, dan foto barang yang hilang atau kamu temukan.</p>
                </div>
                <div style={{ padding: '28px 24px', borderRight: '1px solid #E2E8F0' }}>
                    <p style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px' }}>Langkah 2</p>
                    <p style={{ color: '#0F172A', fontSize: '13px', fontWeight: 500, margin: '0 0 6px' }}>Verifikasi dulu, baru kontak</p>
                    <p style={{ color: '#64748B', fontSize: '12px', margin: 0, lineHeight: 1.7 }}>Pengklaim wajib kirim foto bukti. Kamu yang approve — nomor WA baru terbuka setelah kamu setujui.</p>
                </div>
                <div style={{ padding: '28px 24px' }}>
                    <p style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px' }}>Langkah 3</p>
                    <p style={{ color: '#0F172A', fontSize: '13px', fontWeight: 500, margin: '0 0 6px' }}>Ketemu dan serah terima</p>
                    <p style={{ color: '#64748B', fontSize: '12px', margin: 0, lineHeight: 1.7 }}>Hubungi lewat WhatsApp, atur waktu dan tempat, barang kembali ke pemiliknya.</p>
                </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 32px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8', fontSize: '12px' }}>Dibuat untuk civitas IT Del · 2026</span>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="/login" style={{ color: '#94A3B8', fontSize: '12px', textDecoration: 'none' }}>Masuk</a>
                    <a href="/register" style={{ color: '#94A3B8', fontSize: '12px', textDecoration: 'none' }}>Daftar</a>
                </div>
            </div>

        </div>
    );
}   