// title, priority, placeName, pendingInvoicingPrice, state
//import Vue from 'vue';
//import { App } from './app.js';


serverAddress = ""; //"http://localhost:8080";
//let job = "empty";
/*
fetch(serverAddress + "/job", { method: 'GET' })
        .then(response => {
            console.log(response)
            response.json().then(data => {
                console.log(data);
                job = data;
                console.log(job);
              });
        })
        .catch(function(error) {
            console.log(error);
        })
*/
/*
        
        <div class="list-group-item list-group-item-action" @click="setSelected(todo.id)" v-for="(todo) in todos" :key{todo.id> 
            {{todo.id}}
        </div>
*/
/*
const app = new Vue({
    el: '#app',
    data: { todos: [], selectedItem: {} },
    methods: {
        setSelected(selectedJob) {
            this.selectedItem = selectedJob;
        }
    }
})

fetch(serverAddress + "/job", { method: 'GET' })
.then(response => {
    console.log(response)
    response.json().then(data => {
        console.log(data);
        console.log(JSON.parse(data));
        jobs = JSON.parse(data);
        let tempText = "";
        for (job in jobs) {
            tempText += jobs[job].title;
            tempText += '\n';
            console.log(job);
            let entry =  { id: job, job: jobs[job].title + " " + jobs[job].priority + " " + jobs[job].placeName + " " + jobs[job].pendingInvoicingPrice + " " + jobs[job].state };
            app.todos.push(entry);
        }
        //this.message = tempText;
    });
})
.catch(function(error) {
    console.log(error);
})
*/
