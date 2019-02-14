<template>
    <div class="content-menu">
        <img
            src="/images/logo.png"
            alt="logo menu"
            class="logo"
        >
        <ul class="menu-left">
            <li class="menu-item active">
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <i class="i-con fa fa-home" />
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link
                    to="/message"
                    class="menu-link new-message"
                >
                    <i class="i-con icon-message" />
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <i class="i-con icon-news" />
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <i class="i-con icon-transfer" />
                </nuxt-link>
            </li>
            <li class="menu-item notify">
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <i class="i-con icon-notify" />
                </nuxt-link>
            </li>
            <li class="menu-item logout">
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <i class="i-con icon-logout" />
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>