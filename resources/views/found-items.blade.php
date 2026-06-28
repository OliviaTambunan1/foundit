<h1>Barang Ditemukan</h1>

@foreach($reports as $report)
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h3>{{ $report->title }}</h3>

        <p>
            <strong>Lokasi:</strong>
            {{ $report->location }}
        </p>

        <p>
            {{ $report->description }}
        </p>

        <p>
            Status: {{ $report->status }}
        </p>
    </div>
@endforeach