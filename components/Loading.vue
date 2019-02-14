<template>
    <div
        class="loading"
        v-if="isShowLoading"
    >
        <div
            class="loading-page"
            v-if="isLoadingPage"
        >
            <div class="windows8">
                <div
                    class="wBall"
                    id="wBall_1"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    class="wBall"
                    id="wBall_2"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    class="wBall"
                    id="wBall_3"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    class="wBall"
                    id="wBall_4"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    class="wBall"
                    id="wBall_5"
                >
                    <div class="wInnerBall" />
                </div>
            </div>
        </div>
        <div
            :class="{'not-drop': backgroundAfter, 'full-box': fullBox}"
            class="loading-custom"
            v-else
        >
            <div
                class="lds-spinner"
                :class="size"
            >
                <div class="spiner-item pos-1" />
                <div class="spiner-item pos-2" />
                <div class="spiner-item pos-3" />
                <div class="spiner-item pos-4" />
                <div class="spiner-item pos-5" />
                <div class="spiner-item pos-6" />
                <div class="spiner-item pos-7" />
                <div class="spiner-item pos-8" />
                <div class="spiner-item pos-9" />
                <div class="spiner-item pos-10" />
                <div class="spiner-item pos-11" />
                <div class="spiner-item pos-12" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoadingPage: {
            /* Type loading for page or custom */
            type: Boolean,
            default: true
        },
        isShowLoading: {
            /* Show/hide Loading */
            type: Boolean,
            default: false
        },
        backgroundAfter: {
            /* Show background opacity after loading icon */
            type: Boolean,
            default: false
        },
        fullBox: {
            /* Show full container Note: add class .box-loading in container parent */
            type: Boolean,
            default: false
        },
        size: {
            /* Change size icon loading with class .size-24 or .size-32 or .size-48 */
            type: String,
            default: ''
        }
    },
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>
