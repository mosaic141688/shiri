<template>
  <div>
    <div style="height: 100%; position: relative">

    <v-slide-y-transition mode="out-in">
      <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
        <div v-for="block in blocks" :slot="block.id">
          <v-card class="ticket">
            <v-toolbar card dark prominent dense color="indigo">
              <v-toolbar-title>{{ block.name }}</v-toolbar-title>
              <v-menu bottom right offset-y>
              </v-menu>
            </v-toolbar>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{block.owner}}</div>
                <span class="grey--text">{{block.date}}</span>
              </div>
            </v-card-title>
          </v-card>
        </div>
      </kanban-board>

    </v-slide-y-transition>
    </div>


  </div>
</template>

<script>
  import Vue from 'vue'
  import vueKanban from 'vue-kanban'

  import VueFire from 'vuefire';
  import firebase from 'firebase'
  import newthing from './newthing'
  import {db} from '../db'
  console.log(db)
  let itemsRef = db.ref("items");


  Vue.use(VueFire);
  Vue.use(vueKanban)
  export default {
    components:{newthing},
    data(){
      return{
        stages: ['Pending', 'in-progress', 'Finished'],
        input_form:{
          title: 'New Job details',
          data:{},
          fields:[
            {label: 'Job Title', v_model: 'title', type: 'text', id: 0},
            {label: 'Owner', v_model: 'owner', type: 'text', id: 0},
            {label: 'Cell', v_model: 'cell', type: 'text', id: 0},
            {label: 'Date', v_model: 'date', type: 'date', id: 0},
            {label: 'Price', v_model: 'price', type: 'number', id: 0}
          ]
        }
      }
    },
    firebase:{
      items:itemsRef,
      clients:db.ref('clients')
    },
    computed:{
      blocks(){
        return this.clients.reduce((acc,curr)=>{
          return acc.concat(curr.items.map((i,j) => {return {
            id:j,
            ...i,
            client_id:curr['.key'],
            owner:curr.name
          }}))
        },[])
      }
    },
    methods:{
      save_job(job_data){

       // itemsRef.push({status:'Pending',...job_data})

      },
      updateBlock(id,status){
        itemsRef.child(id).child('status').set(status)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  @import '../assets/kanban.scss';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ticket{
  border-radius: 5px;
}
</style>
