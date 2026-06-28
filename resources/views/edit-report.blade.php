<!DOCTYPE html>

<html>
<head>
    <title>Edit Laporan</title>
</head>
<body>

<h1>Edit Laporan</h1>

<form action="{{ route('reports.update', $report->id) }}"
      method="POST">

```
@csrf
@method('PUT')

<label>Nama Barang</label>
<br>
<input type="text"
       name="title"
       value="{{ $report->title }}">
<br><br>

<label>Lokasi</label>
<br>
<input type="text"
       name="location"
       value="{{ $report->location }}">
<br><br>

<label>Deskripsi</label>
<br>
<textarea name="description">{{ $report->description }}</textarea>
<br><br>

<button type="submit">
    Simpan Perubahan
</button>
```

</form>

</body>
</html>
