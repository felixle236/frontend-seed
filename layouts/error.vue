<template>
    <div class="page-error">
        <div class="page-content">
            <component :is="errorPage" :error="error" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import error400 from '~/components/error/400.vue';
import error404 from '~/components/error/404.vue';
import error500 from '~/components/error/500.vue';

export default Vue.extend({
    layout: 'blank',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    computed: {
        errorPage() {
            if (this.error.statusCode === 404)
                return error404;
            else if (this.error.statusCode === 400)
                return error400;

            // catch everything else
            return error500;
        },
    }
});
</script>

<style lang="scss" scoped>
.page-error {
    text-align: center;
    img {
        max-width: 474px;
        margin-top: 134px;
    }
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-size: 70px;
        line-height: 85px;
        color: #272729;
        margin-top: 32px;
    }
    h3 {
        color: #8D8D94;
        margin-bottom: 12px;
    }
    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #8D8D94;
    }
    button {
        margin: 32px 0;
    }
}
</style>>
