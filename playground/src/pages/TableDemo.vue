<template>
    <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        在此区域进行双指左右滑动操作
    </div>
</template>

<script>
export default {
    data() {
        return {
            startX1: 0,
            startY1: 0,
            startX2: 0,
            startY2: 0,
            endX1: 0,
            endY1: 0,
            endX2: 0,
            endY2: 0,
            isTwoFingers: false
        };
    },
    methods: {
        handleTouchStart(event) {
            if (event.touches.length === 2) {
                this.startX1 = event.touches[0].clientX;
                this.startY1 = event.touches[0].clientY;
                this.startX2 = event.touches[1].clientX;
                this.startY2 = event.touches[1].clientY;
                this.isTwoFingers = true;
            } else {
                this.isTwoFingers = false;
            }
        },
        handleTouchMove(event) {
            if (this.isTwoFingers && event.touches.length === 2) {
                this.endX1 = event.touches[0].clientX;
                this.endY1 = event.touches[0].clientY;
                this.endX2 = event.touches[1].clientX;
                this.endY2 = event.touches[1].clientY;
            } else {
                this.isTwoFingers = false;
            }
        },
        handleTouchEnd() {
            if (this.isTwoFingers) {
                const deltaX1 = this.endX1 - this.startX1;
                const deltaX2 = this.endX2 - this.startX2;
                const averageDeltaX = (deltaX1 + deltaX2) / 2;
                if (Math.abs(averageDeltaX) > 10) { // 设定一个阈值，判断是否为有效滑动
                    if (averageDeltaX > 0) {
                        console.log('双指向右滑动');
                    } else {
                        console.log('双指向左滑动');
                    }
                }
                this.isTwoFingers = false;
            }
        }
    }
};
</script>