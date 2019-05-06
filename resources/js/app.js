
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
//Importing vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginForm from './components/auth/LoginForm.vue';
import UserHome from './components/home/UserHome.vue';
import EnrolmentsIndex from './components/enrolments/EnrolmentsIndex.vue';
import CreateEnrolment from './components/enrolments/CreateEnrolment.vue';
import EditEnrolment from './components/enrolments/EditEnrolment.vue';
import StudentsIndex from './components/students/StudentsIndex.vue';
import CreateStudent from './components/students/CreateStudent.vue';
import EditStudent from './components/students/EditStudent.vue';
import CoursesIndex from './components/courses/CoursesIndex.vue';
import CreateCourse from './components/courses/CreateCourse.vue';
import EditCourse from './components/courses/EditCourse.vue';


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        //This is the name of the component
        name: 'login',
        components: {
            loginForm: LoginForm
        }
    },
    {
        path: '/home',
        component: UserHome,
        name: 'home',
        children: [
            {
                path: 'enrolments',
                name: 'enrolments',
                component: EnrolmentsIndex
            },
            {
                path: 'enrolments/create',
                name: 'enrolments.create',
                component: CreateEnrolment
            },
            {
                path: 'enrolments/:id/edit',
                component: EditEnrolment,
                name: 'editEnrolment'
            },
            {
                path: 'students',
                name: 'students',
                component: StudentsIndex
            },
            {
                path: 'students/create',
                name: 'students.create',
                component: CreateStudent
            },
            {
                path: 'students/:id/edit',
                component: EditStudent,
                name: 'EditStudent'
            },
            {
                path: 'courses',
                name: 'courses',
                component: CoursesIndex
            },
            {
                path: 'courses/create',
                name: 'courses.create',
                component: CreateCourse
            },
            {
                path: 'courses/:id/edit',
                component: EditCourse,
                name: 'EditCourse'
            }
        ]
    },

];

const router = new VueRouter({
    routes: routes
});

//  Creating a new vue instance, this is the root of a view  application
//  el stands for element property
//  Connects to the div with the id of app in our html page, so our view instance is connected to that div
const app = new Vue({
    el: '#app',
    router: router
});
