<template>
    <section class="container">
        <br>
        <h3>USER AUTHENTICATION</h3>
        <br>
        <div v-if="profile">
            <h4>Name: {{ profile.firstName }} {{ profile.lastName }}</h4>
            <h4>Email: {{ profile.email }}</h4>
            <h4 v-if="profile.role">
                Role: {{ profile.role.name }}
            </h4>
        </div>
        <br>
        <hr>
        <br>
        <h3>USER LIST</h3>
        <br>
        <table
            class="table"
            style="text-align: center"
        >
            <thead>
                <tr>
                    <th scope="col">
                        First Name
                    </th>
                    <th scope="col">
                        Last Name
                    </th>
                    <th scope="col">
                        Email
                    </th>
                    <th scope="col">
                        Role
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in userList"
                    :key="user.id"
                >
                    <td scope="row">
                        {{ user.firstName }}
                    </td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role && user.role.name }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    async mounted() {
        try {
            await this.signin({email: 'admin@localhost.com', password: 'Backend-seed2'});
            await this.findUsers();
        }
        catch (error) {
            console.error(error.message);
        }
    },
    computed: {
        ...mapGetters('user', [
            'users'
        ]),
        ...mapGetters('auth', [
            'profile'
        ])
    },
    methods: {
        ...mapActions('user', [
            'findUsers'
        ]),
        ...mapActions('auth', [
            'signin'
        ])
    }
};
</script>
