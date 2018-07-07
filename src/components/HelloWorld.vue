<template>
  <div>
    <v-toolbar dark color="indigo">


      <v-toolbar-title class="white--text">Jobs Workflow</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="height: 100%; position: relative">
    <v-btn
      absolute
      dark
      fab
      top
      left
      color="pink"
      @click="show_dialog=true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-slide-y-transition mode="out-in">
      <kanban-board :stages="stages" :blocks="blocks">
        <div v-for="block in blocks" :slot="block.id">
          <v-card class="ticket">
            <v-toolbar card dark prominent dense color="indigo">
              <v-toolbar-title>{{ block.title }}</v-toolbar-title>
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
    <div>
      <v-dialog
        v-model="show_dialog"
        max-width="500px"
      >
        <v-card tile>
          <v-toolbar card dark prominent color="indigo">
            <v-toolbar-title>Enter an new job</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="save_job">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
            </v-menu>
          </v-toolbar>
          <v-card-text>
            <uform :fields="input_form.fields" :title="input_form.title" :value="input_form.data" v-model="input_form.data"></uform>
          </v-card-text>
        </v-card>

      </v-dialog>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import vueKanban from 'vue-kanban'
  import uform from './uform'
  import VueFire from 'vuefire';
  import firebase from 'firebase'

  console.log(firebase)

  const config = {
    apiKey: "AIzaSyAaGx9BDbpuEq0foZHDNMvuRONUEdhID1E",
    authDomain: "support-11bd7.firebaseapp.com",
    databaseURL: "https://support-11bd7.firebaseio.com",
    projectId: "support-11bd7",
    storageBucket: "support-11bd7.appspot.com",
    messagingSenderId: "1091418876767"
  };
  const app = firebase.initializeApp(config);
  const db = app.database();
  let itemsRef = db.ref("items");


  Vue.use(VueFire);
  Vue.use(vueKanban)
  export default {
    components:{uform},
    data(){
      return{
        show_dialog:false,
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
      items:itemsRef
    },
    computed:{
      blocks(){
        return this.items.map(i => {return {id:i['.key'],...i}})
      }
    },
    methods:{
      save_job(){
        this.show_dialog = false
        itemsRef.push({status:'Pending',...this.input_form.data})
       // this.blocks.push({id:this.blocks.length,status:'Pending',...this.input_form.data})
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
