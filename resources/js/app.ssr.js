"use strict";

import { createSSRApp, h, } from "vue";
import { renderToString, } from "@vue/server-renderer";
import { createInertiaApp, } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";

createServer ((page) => createInertiaApp (
{
    page,

    render: renderToString,

    resolve: (name) => (import.meta.glob ("./Pages/**/*.vue", { eager: true, }))[`./Pages/${name}.vue`],

    setup ({ App, props, plugin, })
    {
        return createSSRApp ({
            render: () => h (
                App, props
            ),
        }).
        use (plugin);
    },
}));
