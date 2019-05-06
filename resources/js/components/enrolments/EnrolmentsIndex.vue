<template>
    <div class="card card-default">
        <div class="card-header"><h1>Enrollments List</h1></div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'enrolments.create' }" class="btn btn-success">
                  New Enrollment
                </router-link>
            </div>
            <p v-if="enrolments.length == 0">There are no enrolments</p>
            <div class="row">
              <div class="card col-md-6" v-for="enrolment in enrolments">
                <div class="card-body">
                  <div>
                    <p><b>Student Name: </b>{{enrolment.student.name}}</p>
                    <p><b>Course Title: </b>{{enrolment.course.title}}</p>
                  </div>
                  <div>
                    <p><b>Enrolled on: </b>{{enrolment.date}}</p>
                    <p><b>At: </b>{{enrolment.time}}</p>
                    <p><b>Status: </b>{{enrolment.status}}</p>
                    <br><router-link :to="{ name: 'editEnrolment', params: { id: enrolment.id } }" class="btn btn-primary">Edit</router-link>
                    <button class="btn btn-danger" v-on:click="deleteEnrolment(enrolment.id)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            var app = this;
            var token = localStorage.getItem('token');
            axios.get('/api/enrolments', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.enrolments = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load enrolments');
            });
        },
        data() {
            return {
                enrolments: []
            }
        },
        methods: {
            deleteEnrolment(enrolmentId) {
                var app = this;
                if (confirm("Are you sure you want to delete this enrolment (id =" + enrolmentId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/enrolments/' +  enrolmentId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.enrolments.findIndex(function (enrolment) {
                            return enrolment.id == enrolmentId;
                        });
                        app.enrolments.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete enrolment!!");
                    });
                }
            }
        }
    }
</script>
