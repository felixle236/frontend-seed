<template>
    <div class="bg-chart" :class="{'bg-black' : bgDark}">
        <i class="pull-left icon-move"></i>
        <h3 class="heading-chart">{{title}}</h3>
        <i class="pull-right icon-close"></i>
        <pie-chart :data="data" :options="options"/>
        <span class="icon-corner"></span>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgDark: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        data: null,
        options: null
    }),
    mounted() {
        this.data = {
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
                {
                    backgroundColor: [
                        'rgba(65, 184, 131, .8)',
                        'rgba(228, 102, 81, .8)',
                        'rgba(0, 216, 255, .8)',
                        'rgba(155, 89, 182, .8)'
                    ],
                    borderWidth: 0,
                    data: [40, 20, 80, 10]
                }
            ]
        };
        this.options = {
            responsive: true,
            maintainAspectRatio: false
        };
    }
};
</script>

