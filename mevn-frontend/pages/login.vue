<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <material-card color="success" elevation="12" title="Sign In">
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    type="text"
                                    v-model="username"
                                    prepend-icon="person"
                                    name="username"
                                    label="Login"
                                ></v-text-field>
                                <v-text-field
                                    type="password"
                                    v-model="password"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-layout justify-center align-center>
                                <v-btn
                                    color="success"
                                    @click.prevent="authenticate"
                                >Login</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </material-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

import { ref, reactive } from "@nuxtjs/composition-api";
import { mapActions } from "vuex";
import materialCard from "~/components/material/AppCard";

export default {
    middleware: 'notAuthenticated',
    components: {
        materialCard,
    },

    setup() {
        const username = ref('');
        const password = ref('');

        function authenticate() {
            const form = {username: username.value, password: password.value};
            this.$axios.post('/login', form)
            .then(( {data} ) => {
                this.$store.dispatch("user/setUserData", data['user']);
                this.$store.commit('setAuth', data['token'])
                Cookie.set('auth', data['token'])
                this.$router.push('/dashboard')
            })
            .catch(() => {

            })
        }

        return { username, password, authenticate }
    }
};
</script>
