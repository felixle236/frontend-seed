<template>
    <div class="bg-chart" :class="{'bg-black' : bgDark}">
        <i class="pull-left icon-move"></i>
        <h3 class="heading-chart">{{title}}</h3>
        <i class="pull-right icon-close"></i>
        <bubble-chart :data="data" :options="options"/>
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
        gradient: null,
        data: null,
        options: null
    }),
    mounted() {
        this.data = {
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: 'rgba(255,99,132,1)',
                    data: [
                        {
                            x: 20,
                            y: 25,
                            r: 5
                        },
                        {
                            x: 40,
                            y: 10,
                            r: 10
                        },
                        {
                            x: 30,
                            y: 22,
                            r: 30
                        }
                    ]
                },
                {
                    label: 'Data Two',
                    backgroundColor: 'rgba(0, 216, 255, .3)',
                    data: [
                        {
                            x: 10,
                            y: 30,
                            r: 15
                        },
                        {
                            x: 20,
                            y: 20,
                            r: 10
                        },
                        {
                            x: 15,
                            y: 8,
                            r: 30
                        }
                    ]
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

