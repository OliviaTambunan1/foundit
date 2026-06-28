<!DOCTYPE html>
<html>

<head>
    <title>Laporan Saya</title>
</head>

<body>

    <h1>Laporan Saya</h1>

    @foreach($reports as $report)

    <div style="border:1px solid black; padding:10px; margin-bottom:10px;">

        <h3>
            <a href="{{ route('reports.show', $report->id) }}">
                {{ $report->title }}
            </a>
        </h3>

        <p>{{ $report->type }}</p>

        <p>{{ $report->location }}</p>

        <p>{{ $report->status }}</p>

        <a href="{{ route('reports.edit', $report->id) }}">
            Edit
        </a>

        <form action="{{ route('reports.destroy', $report->id) }}"
            method="POST">

            @csrf
            @method('DELETE')

            <button type="submit">
                Hapus
            </button>

        </form>

    </div>

    @endforeach

</body>

</html>