<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout wrap>
            <v-flex md12 lg12>
                <material-card
                    color="info"
                    title="Data User"
                    text="Ringkasan Semua Data User"
                >
                    <v-data-table :headers="headers" :items="items" hide-actions>
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
                            <td class="text-xs-right">{{ item.city }}</td>
                        </template>
                    </v-data-table>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import materialCard from "../../components/material/AppCard";

export default {
    layout: 'dashboard',
    components: {
        materialCard
    },
    data() {
        return {
            headers: [
                {
                    sortable: false,
                    text: "ID",
                    value: "id",
                },
                {
                    sortable: false,
                    text: "Name",
                    value: "name",
                },
                {
                    sortable: false,
                    text: "Salary",
                    value: "salary",
                    align: "right",
                },
                {
                    sortable: false,
                    text: "Country",
                    value: "country",
                    align: "right",
                },
                {
                    sortable: false,
                    text: "City",
                    value: "city",
                    align: "right",
                },
            ],
            items: [
                {
                    name: "Dakota Rice",
                    country: "Niger",
                    city: "Oud-Tunrhout",
                    salary: "$35,738",
                },
                {
                    name: "Minerva Hooper",
                    country: "Curaçao",
                    city: "Sinaai-Waas",
                    salary: "$23,738",
                },
                {
                    name: "Sage Rodriguez",
                    country: "Netherlands",
                    city: "Overland Park",
                    salary: "$56,142",
                },
                {
                    name: "Philip Chanley",
                    country: "Korea, South",
                    city: "Gloucester",
                    salary: "$38,735",
                },
                {
                    name: "Doris Greene",
                    country: "Malawi",
                    city: "Feldkirchen in Kārnten",
                    salary: "$63,542",
                },
            ],
        }
    },
}
</script>