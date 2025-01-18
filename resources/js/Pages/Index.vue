<script setup>

import { Avatar, AvatarFallback, AvatarImage, } from "@/Components/ui/avatar";

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

    <div>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback></AvatarFallback>
        </Avatar>
    </div>

    <FooterLayout />
</div>
</template>
