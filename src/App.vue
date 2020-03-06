<template>
  <div id="app" class="row justify-content-center my-5">
    <div class="row">
      <div class="notes">
          <div class="notes-header">
            Create new note
            <button class="float-right btn-sm"> <i class="fas fa-trash" aria-hidden="true" ></i></button>
            <button class="float-right btn-sm" @click="addNote"> <i class="fa fa-check" aria-hidden="true"></i></button>
          </div>
          <textarea name="new-note" v-model="newNote" id="" cols="30" rows="10"></textarea>
        </div>
    </div>

  <div class="row">
      <ul class="">
        <li class="" v-for="notes in notes" :key="notes.id">
        <div class="notes">
          <div class="notes-header">
            {{notes.timestamp}}
            <button class="float-right btn-sm" @click="deleteItem(notes.id)"> <i class="fas fa-trash" aria-hidden="true" ></i></button>
            <button class="float-right btn-sm"> <i class="fa fa-check" aria-hidden="true"></i></button>
          </div>
          <textarea name="" id="" cols="30" rows="10" v-model="notes.content"></textarea>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name: 'App',
  data(){
    return {
      newNote: null,
      notes: []
    }
  },
  methods:  {
    addNote(){
      if(this.newNote){
        db.collection('notes').add({
          content: this.newNote,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err);
        })
        this.newNote = null
        console.log("Succesfully");
        
      }else{
        console.log("error");
        
      }
    },
    deleteItem(id){
      db.collection('notes').doc(id).delete();
      
    }
  },
  created(){
    let ref = db.collection('notes').orderBy('timestamp')
    ref.onSnapshot(snapShot => {
      snapShot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let doc = change.doc
          this.notes.push({
            id: doc.id,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('LLLL')
          })
        }
      });
    })
  }
}
</script>

<style>
  #app{
    
  }
  ul {
     list-style-type: none;
  }
  .notes {
    width: 560px;
    background: #eee;
    box-shadow: #999 1px 1px 3px;
    margin: 30px 0;
    min-height: 200px;
    display: block;
    overflow: hidden;
    position: relative;
  }
  .notes-header{
    line-height: 1.15;
    padding: 10px 10px;
    font-family: sans-serif;
    font-size: 0.7em;
    font-style: italic;
    color: #71CBD0;
  }
  textarea{
    width: 100%;
    min-height: 200px;
  }
</style>
