<template>
  <div id="app">
      
       <div class="addTask">
         <h3>Add Appointment</h3>
         <input type="text" v-model="title" name="title" placeholder="add task..">
         <input type="text" v-model="day" name="day" placeholder="add day..">
         <button type="submit" class="addBtn" @click="addTask">Add Tak</button>

         
       </div>
        
      <div class="taskscontainer" v-for="(task,i) in tasks" :key="task._id">
         <input type="text" v-if="selected._id === task._id" v-model="editTitle" name="title" placeholder="edit  task..">
         <input type="text" v-if="selected._id === task._id"  v-model="editDay" name="day" placeholder="edit day..">
          <div v-else class="title">
             <h3>
            <span class="tag is-Primary">{{i+1}}. &nbsp; </span>
               {{task.title}}
               
          </h3>
            <div class="icons">
              <i class="fas fa-edit edit" @click="editTask(task , _id)"></i>
              <i class="fas fa-close" @click="select(item)"></i>
            </div>
          </div>
                <p>{{task.day}}</p>


      </div>
   
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name : "App",
  components : {},

    data() {
      return {
        tasks : [],
        title :"",
        day : "",
        selected : {},
        "editTitle"  : "",
        "editDay"  : "",
      }
    },
    
  
    
    async mounted () {
       try {
           const res = await axios.get('http://localhost:5000/api/task/get')
           this.tasks = res.data.task
           console.log('Task data',res)
       } catch (error) {
         console.log(error)
       }
    },

    methods : {
       async addTask (){
       try {
            const res = await axios.post('http://localhost:5000/api/task/create', {
              title : this.title,
              day : this.day,
           })
           this.tasks.push(res.data.task)
           this.title = ""
           this.day = ""
           
           console.log('Task data',res)
       } catch (error) {
         console.log(error)
       }   
        },
         async deleteTask (item,i){
          try {
                const res = await axios.delete(`http://localhost:5000/api/task/delete/${item._id}`)
                this.tasks.splice(i,1)
                console.log('Task data',res)
          } catch (error) {
            console.log(error)
          }   
        },

          async select (item){
             this.selected = item;
             this.editTitle = this.title;
             this.editDay = this.day

          }   
       
    },
 

 
}

</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
#app{
  margin: auto;
  max-width: 700px;
  margin-top: 40px;
}
.icons .edit{
  color: #764AF1
}
.fas{
  color: #FF5F00;
  margin: 10px;
  cursor: pointer;
}

.addTask > h3{
  margin-bottom: 10px;
}
.addTask{
  width: 500px;
  display: flex;
  background-color: #E8F9FD;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 1px solid #79DAE8;
  flex-direction: column;
  margin-bottom: 10px;
}
.addTask > input{
  width: 80%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #333;
  margin-bottom: 10px;
  border-radius: 5px;
}
.addTask > input:focus{
  outline: none;
}
.addTask .addBtn{
  width: 50%;
  padding: 10px 15px;
  background-color: blue;
  color: #fff;
  border: none;
  margin-bottom: 10px;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}
.taskscontainer {
  max-width: 500px;
  overflow: auto;
  background-color: #E8F9FD;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}
.taskscontainer .title{
 display: flex;
  justify-content: space-between;
}
.taskscontainer .icons{
   display: flex;
  justify-content: space-between;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>