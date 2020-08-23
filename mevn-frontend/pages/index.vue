<template>
    <v-container fill-height fluid style="flex-wrap: wrap;">
        <div>
            <div v-if="$store.state.auth">
                <p> {{ $store.state.auth }}
                    You are authenticated. You can see the
                    <NuxtLink to="/dashboard">dashboard</NuxtLink>!
                </p>
                <button @click="logout">Logout</button>
            </div>
            <p v-else>
                Please
                <NuxtLink to="/login">login</NuxtLink>.
            </p>
        </div>
    </v-container>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

import { ref, reactive } from "@nuxtjs/composition-api";

export default {
    setup() {

        function logout() {
            Cookie.remove('auth');
            this.$store.commit("setAuth", null)
        }

        return {
            logout
        }
    }
};
</script>