"use strict";

import "./echo";
import "flowbite";
import { createSSRApp, h, } from "vue";
import { createInertiaApp, } from "@inertiajs/vue3";
import { createI18n, } from "vue-i18n";

createInertiaApp (
{
    title: (title) => `${title}`,

    id: "app",

    resolve: (name) => (import.meta.glob ("./Pages/**/*.vue", { eager: true, }))[`./Pages/${name}.vue`],

    setup ({ el, App, props, plugin, })
    {
        createSSRApp ({
            render: () => h (
                App, props
            ),
        }).
        use (plugin).
        use (createI18n ({
            locale: props.initialPage.props.lang,
            fallbackLocale: props.initialPage.props.fallbackLang,
            messages: LARAVEL_TRANSLATIONS,
        })).
        mount (el);
    },
});
