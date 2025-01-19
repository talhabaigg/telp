import { route, } from "ziggy-js";
import { usePage, } from "@inertiajs/vue3";

export function useLang ()
{
    const page = usePage ();

    return {

        currentLang: () => page.props.lang,
        availableLangs: () => page.props.availableLangs,
    };
};

export function useChangeLang (eventListener)
{
    window.location.href = route ('i18n', eventListener.target.value);
};
