<template>
    <div id="image-slider" data-mouse-down-at="0" data-prev-percentage="0">
        <img class="slider-image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" draggable="false"/>
        <img class="slider-image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

let tracker: HTMLElement
let downOutsideBoundingBox = false;

onMounted(() => {
    tracker = document.getElementById("image-slider")!;

    window.onmousedown = e => onDown(e);
    window.ontouchstart = e => onDown(e.touches[0]);

    window.onmousemove = e => onMove(e);
    window.ontouchmove = e => onMove(e.touches[0]);

    window.onmouseup = e => onUp();
    window.ontouchend = e => onUp();
})

function getVerticalBoundariesOfSlider() {
    return {
        top: tracker.getBoundingClientRect().top,
        bottom: tracker.getBoundingClientRect().bottom
    };
}

function clickOutsideOfVerticalBoundaries(event: MouseEvent | Touch) {
    const clickY = event.clientY;
    const verticalBoundaries = getVerticalBoundariesOfSlider();

    if (verticalBoundaries.top > clickY || verticalBoundaries.bottom < clickY ) return true;

    return false;
}

function onDown(event: MouseEvent | Touch) {
    downOutsideBoundingBox = clickOutsideOfVerticalBoundaries(event);
    tracker.dataset.mouseDownAt = event.clientX.toString();
}

function onMove(event: MouseEvent | Touch) {
    if (tracker.dataset.mouseDownAt === "0" || downOutsideBoundingBox) return;
    const mouseDelta = parseFloat(tracker.dataset.mouseDownAt!) - event.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(tracker.dataset.prevPercentage!) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    tracker.dataset.percentage = nextPercentage.toString();
    
    tracker.animate({
        transform: `translate(${nextPercentage}%, 0%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of tracker.getElementsByClassName("slider-image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

function onUp() {
    if (downOutsideBoundingBox) return;
    tracker.dataset.mouseDownAt = "0";  
    tracker.dataset.prevPercentage = tracker.dataset.percentage;
}
</script>