"use strict";

import { defineConfig, } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig ({

    plugins: [

        laravel ({

            input: [

                "resources/js/app.js",
                "resources/css/app.css",
                "resources/css/filament/admin/theme.css",
            ],

            refresh: true,
        }),
    ],
});
