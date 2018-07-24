<template>
    <div>
      <newthing :form="client_form" fullscreen @save ="save_client">
        <v-chip v-for="i in items" color="primary" text-color="white" close @input="remove_item(i)">
          {{i.name}}
        </v-chip>
        <newthing :form="item_form" @save ="save_item">

        </newthing>
      </newthing>

      <v-data-table
        :headers="headers"
        :items="clients"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">

          <td v-for="h in headers" class="text-xs-left">{{ props.item[h.value] }}</td>
        </template>
      </v-data-table>

    </div>
</template>

<script>
  import Vue from 'vue'
  import VueFire from 'vuefire';
  import {db} from '../db'

  Vue.use(VueFire);
  import newthing from './newthing'

  const clone = x => JSON.parse(JSON.stringify(x))

  export default {
    name: "client",
    components: {newthing},
    data() {
      return {
        items:[],
        client_form: {
          title: 'New Job details',
          data: {},
          fields: [
            {label: 'Full Name', v_model: 'name', type: 'text', id: 0},
            {label: 'Cell', v_model: 'cell', type: 'text', id: 1},
            {label: 'Email', v_model: 'email', type: 'text', id: 2},
            {label: 'Date', v_model: 'date', type: 'date', id: 3},
            {label: 'Price', v_model: 'price', type: 'number', id: 4},
            {label: 'Amount Paid', v_model: 'paid', type: 'number', id: 5},
          ]
        },
        item_form: {
          title: 'Item Details',
          data: {},
          fields: [
            {label: 'Item Name', v_model: 'name', type: 'text', id: 0},
            {label: 'Quantity', v_model: 'quantity', type: 'number', id: 1},
            {label: 'Price', v_model: 'price', type: 'number', id: 2},
            {label: 'Details(e.g size)', v_model: 'details', type: 'string', id: 3},
            {label: 'Days to finish', v_model: 'days', type: 'number', id: 4},
          ]
        }
      }
    },
    firebase:{
      clients:db.ref('clients')
    },
    computed:{
      headers(){
        return this.client_form.fields.map(field => {
          return{text: field.label, value: field.v_model}
        }).concat(
          [
            {
              text:'Items'
            }
          ]
        )
      },
      list(){

      }
    },
    methods:{
      save_item(item){
          this.items.push(clone({status:'Pending',...item}))
      },
      remove_item(item){
        this.items.splice(this.items.indexOf(item),1)
      },
      save_client(){
        db.ref('clients').push({items:this.items,...this.client_form.data})
      }
    }
  }


</script>

<style scoped>

</style>

Mazwi Dlamini, contact 76898799, email. Mazwi@ iCloud.com.date 30/07/2018 ,Items (suits)qty 2. Sizes-trouser length 90cm, waist 40cm. Time give for job 7 days, time remaining before collection  7 days Total charge R2500, Amount paid R1000, balance R1500
