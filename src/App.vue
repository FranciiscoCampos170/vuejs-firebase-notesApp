<template>
  <div id="app">
    
    <div class="row justify-content-center my-5" >
      <div id="myDIV" class="header">
          <input type="text" id="myInput" placeholder="Note..." v-model="newNote">
          <span @click="addNote" class="addBtn">Add</span>
       </div>
    </div>

  <div class="row justify-content-center my-5">
      <ul id="myUL">
        <li v-for="notes in notes" :key="notes.id">
          <span class="text-muted time">({{notes.timestamp}})</span> - {{ notes.content }}
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
        console.log("Note Created");
        
      }else{
        console.log("created error");
        
      }
    },
    deleteItem(id){
      db.collection('notes').doc(id).delete();
    },
    updateItem(id, myContent){
      //console.log(this.content);
        db.collection('notes').doc(id).update({
          content: myContent
        }).catch(err => {
          console.log(err);
        })
        console.log("Note Updated");

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
  .time{
    font-size: 0.8em;
  }
* {
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>
