@if($report->photo)

<img
    src="{{ asset('storage/' . $report->photo) }}"
    width="300">

@endif

<h3>
    <a href="{{ route('reports.show', $report->id) }}">
        {{ $report->title }}
    </a>
</h3>

<p>
    <strong>Jenis:</strong>
    {{ $report->type }}
</p>

<p>
    <strong>Lokasi:</strong>
    {{ $report->location }}
</p>

<p>
    <strong>Status:</strong>
    {{ $report->status }}
</p>

<p>
    <strong>Deskripsi:</strong>
    {{ $report->description }}
</p>

<a href="/lost-items">
    Kembali
</a>