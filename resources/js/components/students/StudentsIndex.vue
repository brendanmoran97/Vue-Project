<template>
    <div class="card card-default">
        <div class="card-header"><h1>Students list</h1></div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'students.create' }" class="btn btn-success">
                  New Student
                </router-link>
            </div>
            <p v-if="students.length == 0">There are no Students</p>
            <div class="row">
              <div class="card col-md-6" v-for="student in students">
                <div class="card-body">
                  <div>
                    <p><b>Name: </b>{{student.name}}</p>
                    <p><b>Address: </b>{{student.address}}</p>
                  </div>
                  <div>
                    <p><b>Email: </b>{{student.email}}</p>
                    <p><b>Phone: </b>{{student.phone}}</p>
                    <br><router-link :to="{ name: 'EditStudent', params: { id: student.id } }" class="btn btn-primary">Edit</router-link>
                    <button class="btn btn-danger" v-on:click="deleteStudent(student.id)">Delete</button>
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
            axios.get('/api/students', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.students = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load students');
            });
        },
        data() {
            return {
                students: []
            }
        },
        methods: {
            deleteStudent(studentId) {
                var app = this;
                if (confirm("Are you sure you want to delete this student? (id =" + studentId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/students/' +  studentId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.students.findIndex(function (student) {
                            return student.id == studentId;
                        });
                        app.students.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete student!!");
                    });
                }
            }
        }
    }
</script>
