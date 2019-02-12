<template>
    <section class="container">
        <br>
        <h3>USER AUTHENTICATION</h3>
        <br>
        <div v-if="profile">
            <h4>Name: {{ profile.firstName }} {{ profile.lastName }}</h4>
            <h4>Email: {{ profile.email }}</h4>
            <h4 v-if="userAuth && userAuth.role">
                Role: {{ userAuth.role.name }}
            </h4>
            <h4
                v-show="isConnected"
                style="color: red"
            >
                Socket IO is connected.
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
                    v-for="user in list" 
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
import io from 'socket.io-client';
import {mapGetters, mapActions} from 'vuex';

export default {
    data: () => ({
        isConnected: false
    }),
    async mounted() {
        try {
            const userAuth = await this.signin({email: 'admin@localhost.com', password: 'Backend-seed2'});
            await this.findUsers();

            const socket = io.connect(process.env.API_URL + '/messages', {
                query: {token: userAuth.accessToken}
            });

            socket.on('connect', () => {
                this.isConnected = true;
            });
        }
        catch (error) {
            console.error(error.message);
        }
    },
    computed: {
        ...mapGetters('user', [
            'userAuth',
            'profile',
            'list'
        ])
    },
    methods: {
        ...mapActions('user', [
            'signin',
            'findUsers'
        ])
    }
};
</script>
