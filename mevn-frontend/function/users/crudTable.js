import { reactive, ref } from '@nuxtjs/composition-api';

export function crudTable() {
    const table = reactive({
        headers: [
            { sortable: false, text: "ID", value: "id" },
            { sortable: false, text: "Name", value: "name" },
            { sortable: false, text: "Salary", value: "salary", align: "right", },
            { sortable: false, text: "Country", value: "country", align: "right", },
        ],
        items: [],
    });

    function loadItem(){
        table.items.push({ name: "Dakota Rice", country: "Niger", city: "Oud-Tunrhout", salary: "$35,738", });
    }

    function clearItem(){
        table.items = [];
    }

    function refreshItem(){
        this.$axios.get('http://127.0.0.1:8080/api/user/all')
        .then(( {data} ) => {
            console.log(data)
        })
    }

    return {
        table, loadItem, clearItem, refreshItem
    };
}