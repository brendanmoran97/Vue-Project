<template>
    <div class="card card-default">
        <div class="card-header"><h1>Courses list</h1></div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'courses.create' }" class="btn btn-success">
                  Add a New Course
                </router-link>
            </div>
            <p v-if="courses.length == 0">There are no Courses</p>
            <div class="row">
              <div class="card" v-for="course in courses">
                <div class="card-header">
                    <h3>{{course.title}}</h3>
                </div>
                <div class="card-body">
                    <p><b>Course Code: </b>{{course.code}}</p>
                    <p><b>Description: </b>{{course.description}}</p>
                    <p><b>Points Required: </b>{{course.points}}</p>
                    <p><b>Level: </b>{{course.level}}</p>
                    <router-link :to="{ name: 'editCourse', params: { id: course.id } }" class="btn btn-primary">Edit</router-link>
                    <button class="btn btn-danger" v-on:click="deleteCourse(course.id)">Delete</button>
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
            axios.get('/api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.courses = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load courses');
            });
        },
        data() {
            return {
                courses: []
            }
        },
        methods: {
            deleteCourse(courseId) {
                var app = this;
                if (confirm("Are you sure you want to delete this student? (id =" + courseId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/courses/' +  courseId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.courses.findIndex(function (course) {
                            return course.id == courseId;
                        });
                        app.courses.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete course!!");
                    });
                }
            }
        }
    }
</script>
