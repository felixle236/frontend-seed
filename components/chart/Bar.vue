<template>
    <div class="bg-chart" :class="{'bg-black' : bgDark}">
        <i class="pull-left icon-move"></i>
        <h3 class="heading-chart">{{title}}</h3>
        <i class="pull-right icon-close"></i>
        <bar-chart :data="data" :options="options"/>
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
    data() {
        return {
            gradient: null,
            data: null,
            options: null,
        };
    },
    mounted() {
        var canvas = document.createElement('canvas');
        this.gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
        this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)'); // show this color at 0%;
        this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)'); // show this color at 50%
        this.gradient.addColorStop(1, 'rgba(145, 67, 204, 0.46)'); // show this color at 100%
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: this.gradient,
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                }
            ]
        };
        this.options = {
            responsive: true,
            maintainAspectRatio: false,
        };
    }
};
</script>

