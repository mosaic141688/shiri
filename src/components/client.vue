<template>
    <div>
      <newthing :form="client_form" fullscreen @save ="save_client">
        Items
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

          <td v-for="h in headers" class="text-xs-left">
            <div v-if="h.value=='items'">
              <v-chip v-for="job in props.item.items">
                <v-avatar class="teal">{{job.quantity}}</v-avatar>
                {{job.name}}
              </v-chip>
            </div>

            <div v-else>
              {{ props.item[h.value] }}
            </div>
          </td>
        </template>
      </v-data-table>

    </div>
</template>

<script>
  import Vue from 'vue'
  import VueFire from 'vuefire';
  import {db} from '../db'
  import newthing from './newthing'

  Vue.use(VueFire);

  const clone = x => JSON.parse(JSON.stringify(x))

  export default {
    name: "client",
    components: {newthing},
    data() {
      return {
        items:[],
        client_form: {
          title: 'New Client details',
          data: {},
          fields: [
            {label: 'Full Name', v_model: 'name', type: 'text', id: 0},
            {label: 'Cell', v_model: 'cell', type: 'text', id: 1},
            {label: 'Email', v_model: 'email', type: 'text', id: 2},
            {label: 'Date', v_model: 'date', type: 'date', id: 3},
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
              text:'Items',
              value:'items'
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
