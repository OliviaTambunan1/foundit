<?php

namespace Database\Seeders;

use App\Models\Claim;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        $alice = User::create([
            'name' => 'Alice Pratama',
            'email' => 'alice@itdel.ac.id',
            'phone' => '628123456789',
            'password' => Hash::make('password'),
        ]);

        $budi = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@itdel.ac.id',
            'phone' => '628987654321',
            'password' => Hash::make('password'),
        ]);

        $citra = User::create([
            'name' => 'Citra Wijaya',
            'email' => 'citra@itdel.ac.id',
            'phone' => '628111222333',
            'password' => Hash::make('password'),
        ]);

        $dani = User::create([
            'name' => 'Dani Putra',
            'email' => 'dani@itdel.ac.id',
            'phone' => '628444555666',
            'password' => Hash::make('password'),
        ]);

        // Reports — variasi tanggal dan status
        $reports = [
            [
                'user_id' => $alice->id,
                'type' => 'lost',
                'title' => 'Dompet Kulit Coklat',
                'description' => 'Berisi KTM, ATM BRI, dan uang tunai. Hilang sekitar jam makan siang.',
                'category' => 'Aksesoris',
                'location' => 'Kantin Gedung A',
                'status' => 'hilang',
                'created_at' => now()->subDays(6),
                'updated_at' => now()->subDays(6),
            ],
            [
                'user_id' => $alice->id,
                'type' => 'lost',
                'title' => 'Kabel Charger USB-C',
                'description' => 'Warna putih, merk Anker, panjang 1 meter.',
                'category' => 'Elektronik',
                'location' => 'Lab Komputer 3',
                'status' => 'hilang',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'user_id' => $budi->id,
                'type' => 'found',
                'title' => 'Kacamata Hitam Ray-Ban',
                'description' => 'Ditemukan di bangku taman dekat gedung rektorat.',
                'category' => 'Aksesoris',
                'location' => 'Taman Kampus',
                'status' => 'ditemukan',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'user_id' => $budi->id,
                'type' => 'found',
                'title' => 'Buku Catatan Algoritma',
                'description' => 'Sampul biru, ada nama di halaman depan. Ditemukan di kursi ruang kuliah.',
                'category' => 'Buku/Alat Tulis',
                'location' => 'Ruang 301',
                'status' => 'diklaim',
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(2),
            ],
            [
                'user_id' => $citra->id,
                'type' => 'lost',
                'title' => 'Botol Minum Stainless',
                'description' => 'Warna hijau army, ada stiker laptop di badan botol.',
                'category' => 'Lainnya',
                'location' => 'Perpustakaan Lt. 2',
                'status' => 'hilang',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
            [
                'user_id' => $citra->id,
                'type' => 'found',
                'title' => 'Jam Tangan Casio Digital',
                'description' => 'Warna hitam, tali karet. Ditemukan di lapangan basket.',
                'category' => 'Aksesoris',
                'location' => 'Lapangan Basket',
                'status' => 'diklaim',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(1),
            ],
            [
                'user_id' => $dani->id,
                'type' => 'lost',
                'title' => 'Earphone JBL Putih',
                'description' => 'Earphone kabel, warna putih, ada case kecilnya.',
                'category' => 'Elektronik',
                'location' => 'Aula Gedung B',
                'status' => 'hilang',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'user_id' => $dani->id,
                'type' => 'found',
                'title' => 'Kartu Mahasiswa (KTM)',
                'description' => 'KTM atas nama mahasiswa Sistem Informasi angkatan 2023.',
                'category' => 'Dokumen',
                'location' => 'Lobi Gedung C',
                'status' => 'ditemukan',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'user_id' => $alice->id,
                'type' => 'found',
                'title' => 'Flashdisk 16GB Merah',
                'description' => 'Merk SanDisk warna merah. Ditemukan di meja lab.',
                'category' => 'Elektronik',
                'location' => 'Lab Komputer 1',
                'status' => 'selesai',
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(1),
            ],
            [
                'user_id' => $budi->id,
                'type' => 'lost',
                'title' => 'Jaket Hoodie Abu-abu',
                'description' => 'Jaket hoodie polos warna abu-abu, ukuran L, ada nama di label dalam.',
                'category' => 'Pakaian',
                'location' => 'Kantin Gedung B',
                'status' => 'hilang',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
            [
                'user_id' => $citra->id,
                'type' => 'found',
                'title' => 'Payung Lipat Biru Navy',
                'description' => 'Payung lipat kecil warna biru navy, ditemukan di depan perpustakaan.',
                'category' => 'Lainnya',
                'location' => 'Depan Perpustakaan',
                'status' => 'ditemukan',
                'created_at' => now()->subHours(5),
                'updated_at' => now()->subHours(5),
            ],
            [
                'user_id' => $dani->id,
                'type' => 'lost',
                'title' => 'Mouse Wireless Logitech',
                'description' => 'Mouse wireless hitam, receiver USB-nya masih terpasang di laptop.',
                'category' => 'Elektronik',
                'location' => 'Ruang Seminar Lt. 3',
                'status' => 'hilang',
                'created_at' => now()->subHours(3),
                'updated_at' => now()->subHours(3),
            ],
        ];

        foreach ($reports as $r) {
            Report::create($r);
        }

        // Claims
        $bukuCatatan = Report::where('title', 'Buku Catatan Algoritma')->first();
        Claim::create([
            'report_id' => $bukuCatatan->id,
            'claimer_id' => $alice->id,
            'message' => 'Itu buku saya, ada nama "Alice P." di halaman pertama dan coretan catatan saya di bab 3.',
            'status' => 'approved',
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(2),
        ]);

        $jamTangan = Report::where('title', 'Jam Tangan Casio Digital')->first();
        Claim::create([
            'report_id' => $jamTangan->id,
            'claimer_id' => $dani->id,
            'message' => 'Jam saya, ada goresan kecil di sudut kiri layar dan tali sedikit sobek di bagian belakang.',
            'status' => 'approved',
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(1),
        ]);

        $flashdisk = Report::where('title', 'Flashdisk 16GB Merah')->first();
        Claim::create([
            'report_id' => $flashdisk->id,
            'claimer_id' => $budi->id,
            'message' => 'Itu flashdisk saya, ada folder bernama "Tugas Akhir" dan file presentasi sidang di dalamnya.',
            'status' => 'approved',
            'created_at' => now()->subDays(6),
            'updated_at' => now()->subDays(1),
        ]);

        $dompet = Report::where('title', 'Dompet Kulit Coklat')->first();
        Claim::create([
            'report_id' => $dompet->id,
            'claimer_id' => $citra->id,
            'message' => 'Saya menemukan dompet ini di dekat kasir kantin. Ada kartu atas nama Alice di dalamnya.',
            'status' => 'pending',
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);
    }
}