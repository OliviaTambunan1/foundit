<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Report;
use App\Models\Claim;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Demo users
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
            'phone' => null,
            'password' => Hash::make('password'),
        ]);

        // Demo reports
        $reports = [
            ['user_id' => $alice->id, 'type' => 'lost', 'title' => 'Dompet Kulit Coklat', 'description' => 'Berisi KTM dan ATM, hilang sekitar jam makan siang', 'category' => 'Aksesoris', 'location' => 'Kantin Gedung A', 'status' => 'hilang'],
            ['user_id' => $alice->id, 'type' => 'lost', 'title' => 'Kabel Charger USB-C', 'description' => 'Warna putih merk Anker', 'category' => 'Elektronik', 'location' => 'Lab Komputer 3', 'status' => 'hilang'],
            ['user_id' => $budi->id, 'type' => 'found', 'title' => 'Kacamata Hitam Ray-Ban', 'description' => 'Ditemukan di bangku taman', 'category' => 'Aksesoris', 'location' => 'Taman Kampus', 'status' => 'ditemukan'],
            ['user_id' => $budi->id, 'type' => 'found', 'title' => 'Buku Catatan Algoritma', 'description' => 'Sampul biru, ada nama di halaman depan', 'category' => 'Buku/Alat Tulis', 'location' => 'Ruang 301', 'status' => 'ditemukan'],
            ['user_id' => $citra->id, 'type' => 'lost', 'title' => 'Botol Minum Stainless', 'description' => 'Warna hijau, ada stiker di badan botol', 'category' => 'Lainnya', 'location' => 'Perpustakaan Lt. 2', 'status' => 'hilang'],
            ['user_id' => $citra->id, 'type' => 'found', 'title' => 'Jam Tangan Digital', 'description' => 'Merk Casio warna hitam', 'category' => 'Aksesoris', 'location' => 'Lapangan Basket', 'status' => 'diklaim'],
            ['user_id' => $alice->id, 'type' => 'found', 'title' => 'Flashdisk 16GB', 'description' => 'Warna merah, merk Sandisk', 'category' => 'Elektronik', 'location' => 'Lab Komputer 1', 'status' => 'selesai'],
        ];

        foreach ($reports as $r) {
            Report::create($r);
        }

        // Demo claims
        $jamTangan = Report::where('title', 'Jam Tangan Digital')->first();
        Claim::create([
            'report_id' => $jamTangan->id,
            'claimer_id' => $alice->id,
            'message' => 'Ini jam saya, ada goresan kecil di bagian kiri layar.',
            'status' => 'approved',
        ]);

        $flashdisk = Report::where('title', 'Flashdisk 16GB')->first();
        Claim::create([
            'report_id' => $flashdisk->id,
            'claimer_id' => $budi->id,
            'message' => 'Itu flashdisk saya, ada folder bernama "Tugas Akhir" di dalamnya.',
            'status' => 'approved',
        ]);

        $dompet = Report::where('title', 'Dompet Kulit Coklat')->first();
        Claim::create([
            'report_id' => $dompet->id,
            'claimer_id' => $citra->id,
            'message' => 'Saya rasa ini dompet saya, KTM atas nama Citra Wijaya.',
            'status' => 'pending',
        ]);
    }
}