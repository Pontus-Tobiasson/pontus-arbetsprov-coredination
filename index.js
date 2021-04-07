Vue.component('job-item', {
    props: ['job'],

    template: `<div class="item" v-bind:class="{ selected: job.selected }" v-on:click="selectJob(job)">
                <div>{{ job.title }}</div>
                <div>{{ job.priority }}</div>
                <div>{{ job.description }}</div>
                <div>{{ job.pendingInvoicingPrice / 100 }}$</div>
                <div>{{ job.state }}</div>
               </div>`,

    methods: {
        selectJob: function(job) {
            if (app.selected) {
                app.selected.selected = false;
            }
            app.selected = job;
            if (app.selected) {
                app.selected.selected = true;
            }
        }
    }
});


const app = new Vue({
    el: '#app',

    data: {
        jobList: [],
        selected: null,
        API_Token: "",
        tokenStatus: ""
    },

    methods: {
        setToken: function() {
            console.log("Attempting to set token to " + app.API_Token);
            fetch('/token/' + app.API_Token, { method: 'POST' })
                .then(response => {
                    response.json().then(data => {
                        console.log(data);
                        app.refresh();
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        },

        refresh: function() {
            fetch('/job', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data === 'Invalid token') {
                    app.tokenStatus = 'Token required';
                } else {
                    app.tokenStatus = '';
                    app.jobList = [];
                    const jobs = JSON.parse(data);
                    for (job in jobs) {
                        const entry = jobs[job];
                        entry.id = job;
                        entry.selected = false;
                        app.jobList.push(entry);
                    }
                    app.selected = app.jobList[0];
                }
            })
            .catch(function(error) {
                console.error(error);
            })
        }
    }
});

app.refresh();
