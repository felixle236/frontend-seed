<template>
    <div
        class="box-left box-collapse"
        @click="collapse"
    >
        <span class="ellipsis-v">
            <i
                class="fa fa-circle"
                aria-hidden="true"
            />
            <i
                class="fa fa-circle"
                aria-hidden="true" 
            />
            <i
                class="fa fa-circle"
                aria-hidden="true" 
            />
        </span>
    </div>
</template>
<script>
export default {
    methods: {
        collapse() {
            this.$emit('collapse');
        }
    }
};
</script>
