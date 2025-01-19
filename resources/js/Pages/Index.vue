<script setup>

import { useLang, useChangeLang, } from "@/Composables/i18n";

</script>

<script>

import { Head, } from "@inertiajs/vue3";
import HeaderLayout from "./Layouts/HeaderLayout.vue";
import FooterLayout from "./Layouts/FooterLayout.vue";

export default {

    components: {

        Head,

        HeaderLayout,
        FooterLayout,
    },
};

</script>

<style scoped></style>

<template>
<Head title="Title"></Head>

<div>
    <HeaderLayout />
    <div class="mx-2">
        <div>{{ $t ('common.welcome') }}</div>
        <select @change="useChangeLang" :value="useLang ().currentLang ()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="lang in useLang ().availableLangs ()" :key="`lang-${lang}`" :value="lang">{{ lang.toUpperCase () }}</option>
        </select>
    </div>
    <FooterLayout />
</div>
</template>
