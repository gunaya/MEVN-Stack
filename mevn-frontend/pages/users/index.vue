<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout row wrap>
            <v-flex md8 lg8>
                <v-btn outlined color="info" @click="refreshItem">Refresh Item</v-btn>
                <v-btn outlined color="indigo" @click="manualItem">Auto Add Item</v-btn>
                <v-btn outlined color="primary" @click.stop="modal_status = true">Manual Add Item</v-btn>
            </v-flex>
            <v-flex md4 lg4 text-xs-right>
                <v-btn outlined color="danger" @click="clearItem">Clear Item</v-btn>
            </v-flex>
            <v-flex md12 lg12>
                <material-card color="info" title="Data User" text="Ringkasan Semua Data User">
                    <v-data-table :headers="table.headers" :items="table.items">
                        <template slot="headerCell" slot-scope="{ header }">
                            <span
                                class="font-weight-light text-warning text--darken-3"
                                v-text="header.text"
                            />
                        </template>
                        <template slot="items" slot-scope="{ index, item }">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name.first_name +' '+item.name.last_name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.gender }}</td>
                        </template>
                    </v-data-table>
                </material-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="modal_status" max-width="50%">
            <v-card>
                <v-card-title class="headline">Add User</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-layout wrap>
                            <v-flex md5 lg5>
                                <v-text-field
                                    label="First Name"
                                    class="purple-input"
                                    v-model="form.name.first_name"
                                />
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex md5 lg5>
                                <v-text-field
                                    label="Last Name"
                                    class="purple-input"
                                    v-model="form.name.last_name"
                                />
                            </v-flex>
                        </v-layout>
                        <v-text-field label="Email" class="purple-input" v-model="form.email" />
                        <v-select :items="select_option" label="Gender" dense class="purple-input" v-model="form.gender"></v-select>
                        <v-layout wrap>
                            <v-flex md5 lg5>
                                <v-text-field type="number" label="Phone Number" class="purple-input" v-model="form.phone_number" />
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex md5 lg5>
                                <v-text-field label="Username" class="purple-input" v-model="form.username" />
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red darken-1" text @click="modal_status = false">Cancel</v-btn>

                    <v-btn color="blue darken-1" text @click="addItem">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar color="success" :top="true" :right="true" :timeout="2000" v-model="table.snackbar_status">
            <v-icon color="white" class="mr-3" >
                mdi-check-circle
            </v-icon>
            <div>User successfully added</div>
            <v-icon size="16" @click="table.snackbar_status = false" >
                mdi-close-circle
            </v-icon>
        </v-snackbar>
    </v-container>
</template>



<script>
import { ref, reactive } from "@nuxtjs/composition-api";
import materialCard from "../../components/material/AppCard";

// function
import { crudTable } from "../../function/users/crudTable";

export default {
    layout: "dashboard",
    components: {
        materialCard,
    },
    setup() {
        const modal_status = ref(false);
        const select_option = ref(["male", "female"]);

        const { table, form, manualItem, clearItem, refreshItem, addItem } = crudTable();

        return {
            table,
            modal_status,
            form,
            select_option,
            manualItem,
            clearItem,
            refreshItem,
            addItem,
        };
    },
};
</script>