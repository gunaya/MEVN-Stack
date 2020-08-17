import { reactive, ref } from '@nuxtjs/composition-api';

export default function() {
    const table = reactive({
        headers: [
            { sortable: false, text: "ID", value: "_id" },
            { sortable: false, text: "Name", value: "name" },
            { sortable: false, text: "Email", value: "email" },
            { sortable: false, text: "Gender", value: "gender" },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        items: []
    });
    const form = reactive({
        _id: '',
        name: { first_name: '', last_name: '' },
        email: '',
        gender: '',
        username: '',
        phone_number: '',
        modal_status: false,
    });
    const snackbar = reactive({
        status: false,
        text: '',
        color: ''
    });

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
        this.$axios.post('/user', form)
        .then(( {data} ) => {
            if(data['status'] == 'SUCCESS'){
                this.refreshItem();

                snackbar.status = true;
                snackbar.color = 'success';
                snackbar.text = 'User '+data['data']['name']['first_name']+' successfully created'

                form.modal_status = false
                emptyForm()
            }
        })
    };

    function updateItem(){
        this.$axios.put('/user/'+form['_id'], form)
        .then(( {data} ) => {
            snackbar.status = true;
            snackbar.color = 'success';
            snackbar.text = 'User '+form['name']['first_name']+' successfully updated'

            form.modal_status = false
            emptyForm()
            this.refreshItem();
        })
    };

    function deleteItem(item) {
        this.$axios.delete('/user/'+item['_id'])
        .then(( {data} ) => {
            this.refreshItem();

            snackbar.status = true;
            snackbar.color = 'success';
            snackbar.text = 'User '+item['name']['first_name']+' successfully deleted'
        })
    };

    function emptyForm(){
        form._id = '';
        form.name.first_name = '';
        form.name.last_name = '';
        form.email = '';
        form.gender = '';
        form.username = '';
        form.phone_number = '';
    }

    return {
        table, form, snackbar,
        manualItem, clearItem, refreshItem, addItem, updateItem, deleteItem, emptyForm
    };
}