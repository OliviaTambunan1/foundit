<form action="{{ route('reports.store') }}"
    method="POST"
    enctype="multipart/form-data">

    @csrf

    <label>Nama Barang</label>
    <br>
    <input type="text" name="title">
    <br><br>

    <label>Jenis Laporan</label>
    <br>
    <select name="type">
        <option value="lost">Hilang</option>
        <option value="found">Ditemukan</option>
    </select>
    <br><br>

    <label>Lokasi</label>
    <br>
    <input type="text" name="location">
    <br><br>

    <label>Deskripsi</label>
    <br>
    <textarea name="description"></textarea>
    <br><br>

    <label>Foto Barang</label>
    <input type="file" name="photo">
    <br><br>

    <button type="submit">Simpan</button>
</form>