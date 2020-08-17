<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout wrap>
            <v-flex md6 lg6>
                <v-btn class="ma-2" outlined color="info" @click="refreshItem">Refresh Item</v-btn>
                <v-btn class="ma-2" outlined color="indigo" @click="loadItem">Auto Add Item</v-btn>
            </v-flex>
            <v-flex md6 lg6>
                <v-btn class="ma-2" outlined color="danger" @click="clearItem">Clear Item</v-btn>
            </v-flex>
            <v-flex md12 lg12>
                <material-card color="info" title="Data User" text="Ringkasan Semua Data User">
                    <v-data-table :headers="table.headers" :items="table.items" hide-actions>
                        <template slot="headerCell" slot-scope="{ header }">
                            <span
                                class="font-weight-light text-warning text--darken-3"
                                v-text="header.text"
                            />
                        </template>
                        <template slot="items" slot-scope="{ index, item }">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td class="text-xs-right">{{ item.salary }}</td>
                            <td class="text-xs-right">{{ item.country }}</td>
                        </template>
                    </v-data-table>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>
import { ref, reactive } from "@nuxtjs/composition-api";
import materialCard from "../../components/material/AppCard";

// function
import { crudTable } from '../../function/users/crudTable'

export default {
    layout: "dashboard",
    components: {
        materialCard,
    },
    setup() {
        const { table, loadItem, clearItem, refreshItem } = crudTable();

        return {
            table, loadItem, clearItem, refreshItem
        }
    },
};

</script>