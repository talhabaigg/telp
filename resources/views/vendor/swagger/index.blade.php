<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>{{ config("swagger.title") }}</title>

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700">

    <!-- Swagger Styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui.min.css"
        integrity="sha512-c9Fmh2rJWb5kaFhvVlPcBLrFdzrVXkdTofQAozw6MfOsC3DwN6pHrpqk9gm8qwJh9wURiK1Hv57/GxmzJzew8g=="
        crossorigin="anonymous" />

    <style type="text/css">

        html
        {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }

        body
        {
            margin: 0;
            background: #fafafa;
        }

        *,
        *:before,
        *:after
        {
            box-sizing: inherit;
        }

    </style>
</head>

<body>

    <!-- Swagger Container -->
    <div id="swagger-ui"></div>

    <!-- Swagger Scripts -->

    <!-- Swagger Bundle -->
    <script charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui-bundle.js"
        integrity="sha512-nsOxDu2mkW1RaAERVAb/cXBM8mykI74y3tJ5SjjEfGHVfyiFXWwdUAHuCy2XZxMpZcPrCKOoPmNT8Fk2eF+i5g=="
        crossorigin="anonymous"></script>

    <!-- Swagger Standalone Preset -->
    <script charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui-standalone-preset.js"
        integrity="sha512-/puZAOZVY7sKGhiOx76byRJ70RRY+k6aswiFIHNVLlj53WOg+grt1N4HIYw1OwvEi/RN8XV2NM40xS+tY2zR7g=="
        crossorigin="anonymous"></script>

    <!-- Initialize Swagger -->
    <script type="text/javascript">

        window.onload = function () {

            const swagger = SwaggerUIBundle (
            {
                url: "{!! $urlToDocs !!}",
                dom_id: "#swagger-ui",
                layout: "StandaloneLayout",
                deepLinking: true,

                presets: [

                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset,
                ],

                plugins: [

                    SwaggerUIBundle.plugins.DownloadUrl,
                ],
            });

            window.ui = swagger;
        };

    </script>

</body>
</html>