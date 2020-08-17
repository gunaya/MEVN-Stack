import { reactive, ref } from '@nuxtjs/composition-api';

export function crudTable() {
    const table = reactive({
        headers: [
            { sortable: false, text: "ID", value: "_id" },
            { sortable: false, text: "Name", value: "name" },
            { sortable: false, text: "Email", value: "email" },
            { sortable: false, text: "Gender", value: "gender" },
        ],
        items: [],
        snackbar_status: false
    });
    
    const form = reactive({
        name: { first_name: '', last_name: '' },
        email: '',
        gender: '',
        username: '',
        phone_number: '',
    })

    function manualItem(){
        let r = Math.random().toString(36).substring(7);
        table.items.push({ email: r+'@gmail.com', gender: "male", name: {first_name: r, last_name: 'Random'}});
    }

    function clearItem(){
        table.items = [];
    }

    function refreshItem(){
        this.$axios.get('/user/all')
        .then(( {data} ) => {
            table.items = data['data'];
        })
    }

    function addItem(){
        console.log(form)
        this.$axios.post('/user', form)
        .then(( {data} ) => {
            if(data['status'] == 'SUCCESS'){
                console.log(data)
                table.snackbar_status = true;
            }
        })
    }

    return {
        table, form,
        manualItem, clearItem, refreshItem, addItem
    };
}