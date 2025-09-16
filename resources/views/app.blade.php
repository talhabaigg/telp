<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link rel="manifest" href="{{ asset('manifest.json') }}" />

    @viteReactRefresh
    <link rel="stylesheet" href="{{ asset('js/app.css') }}" />
    @vite('resources/css/app.css')
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>

<body class="antialiased">
    @routes
    @inertia
    <script src="{{ asset('sw.js') }}" defer></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>

</html>
