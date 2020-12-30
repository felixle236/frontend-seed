<template>
    <div
        v-if="isShowLoading"
        class="loading"
    >
        <div
            v-if="isLoadingPage"
            class="loading-page"
        >
            <div class="windows8">
                <div
                    id="wBall_1"
                    class="wBall"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    id="wBall_2"
                    class="wBall"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    id="wBall_3"
                    class="wBall"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    id="wBall_4"
                    class="wBall"
                >
                    <div class="wInnerBall" />
                </div>
                <div
                    id="wBall_5"
                    class="wBall"
                >
                    <div class="wInnerBall" />
                </div>
            </div>
        </div>
        <div
            v-else
            :class="{'not-drop': backgroundAfter, 'full-box': fullBox}"
            class="loading-custom"
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
