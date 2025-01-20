"use strict";

import { defineConfig, } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import i18n from "vite-plugin-laravel-translations";

export default defineConfig ({

    plugins: [

        laravel ({

            ssr: "resources/js/app.ssr.js",

            input: [

                "resources/js/app.js",
                "resources/css/app.css",
                "resources/css/filament/admin/theme.css",
            ],

            refresh: true,
        }),

        vue ({

            template: {

                transformAssetUrls: {

                    base: null,
                    includeAbsolute: false,
                },
            },
        }),

        i18n ({

            namespace: false,
            includeJson: false,
        }),
    ],
});
