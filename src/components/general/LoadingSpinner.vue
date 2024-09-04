<template>
    <div class="spinner" :style="styles.spinner">
        <div class="dots-container" :style="styles.dotsContainer">
            <div class="big-dot" :style="styles.bigDot">
                <div class="small-dot" :style="styles.smallDot"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from "vue";

const props = defineProps({
    animationDuration: {
        type: Number,
        default: 3250
    },
    size: {
        type: Number,
        default: 70
    },
    color: {
        type: String,
        default: "#ffffff"
    }
});

onMounted(() => {
    appendKeyframes(smallDotName.value, generateSmallDotKeyframes());
    appendKeyframes(bigDotName.value, generateBigDotKeyframes());
});

onUnmounted(() => {
    removeKeyframes(smallDotName.value);
    removeKeyframes(bigDotName.value);
});

watch(
    () => props.size,
    () => {
        updateAnimation();
    }
);

watch(
    () => props.color,
    () => {
        updateAnimation();
    }
);

function appendKeyframes(name: string, frames: string) {
    if (!window?.document) {
        return;
    }

    const sheet = document.createElement("style");
    sheet.setAttribute("id", name);
    sheet.innerHTML = `@keyframes ${name} {${frames}}`;
    document.body.appendChild(sheet);
}

function removeKeyframes(name: string) {
    if (!window?.document) {
        return;
    }

    const sheet = document.getElementById(name);
    if (!sheet) {
        return;
    }
    sheet.parentNode?.removeChild(sheet);
}

function updateAnimation() {
    removeKeyframes(smallDotName.value);
    appendKeyframes(smallDotName.value, generateSmallDotKeyframes());
    removeKeyframes(bigDotName.value);
    appendKeyframes(bigDotName.value, generateBigDotKeyframes());
}

const smallDotName = ref(`spinner-small-dot-${Date.now()}`);

const bigDotName = ref(`spinner-big-dot-${Date.now()}`);

const dotSize = computed(() => {
    return props.size / 7;
});

const styles = computed(() => {
    return {
        spinner: {
            width: `${props.size}px`,
            height: `${props.size}px`
        },
        dotsContainer: {
            width: `${dotSize.value}px`,
            height: `${dotSize.value}px`
        },
        smallDot: {
            background: props.color,
            animationDuration: `${props.animationDuration}ms`,
            animationName: smallDotName.value
        },
        bigDot: {
            background: props.color,
            animationDuration: `${props.animationDuration}ms`,
            animationName: bigDotName.value
        }
    };
});

function generateSmallDotKeyframes() {
    return `
    0%, 100% {
        box-shadow: 0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color};
    }
    25%, 75% {
        box-shadow: ${dotSize.value * 1.4}px 0 0 ${props.color},
                    -${dotSize.value * 1.4}px 0 0 ${props.color},
                    0 ${dotSize.value * 1.4}px 0 ${props.color},
                    0 -${dotSize.value * 1.4}px 0 ${props.color},
                    ${dotSize.value}px -${dotSize.value}px 0 ${props.color},
                    ${dotSize.value}px ${dotSize.value}px 0 ${props.color},
                    -${dotSize.value}px -${dotSize.value}px 0 ${props.color},
                    -${dotSize.value}px ${dotSize.value}px 0 ${props.color};
    }
    100% {
        box-shadow: 0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color};
    }`;
}

function generateBigDotKeyframes() {
    return `
    0%, 100% {
        box-shadow: 0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color};
    }
    50% {
        transform: rotate(180deg);
    }
    25%, 75% {
        box-shadow: ${dotSize.value * 2.6}px 0 0 ${props.color},
                    -${dotSize.value * 2.6}px 0 0 ${props.color},
                    0 ${dotSize.value * 2.6}px 0 ${props.color},
                    0 -${dotSize.value * 2.6}px 0 ${props.color},
                    ${dotSize.value * 1.9}px -${dotSize.value * 1.9}px 0 ${props.color},
                    ${dotSize.value * 1.9}px ${dotSize.value * 1.9}px 0 ${props.color},
                    -${dotSize.value * 1.9}px -${dotSize.value * 1.9}px 0 ${props.color},
                    -${dotSize.value * 1.9}px ${dotSize.value * 1.9}px 0 ${props.color};
    }
    100% {
        transform: rotate(360deg);
        box-shadow: 0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color},
                    0 0 0 ${props.color};
    }`;
}
</script>

<style lang="css">
.spinner,
.spinner * {
    box-sizing: border-box;
}

.spinner {
    height: 70px;
    width: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.spinner .dots-container {
    height: calc(70px / 7);
    width: calc(70px / 7);
}

.spinner .small-dot {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    animation: spinner-small-dot-animation 2.5s 0s infinite both;
}

.spinner .big-dot {
    height: 100%;
    width: 100%;
    padding: 10%;
    border-radius: 50%;
    animation: spinner-big-dot-animation 2.5s 0s infinite both;
}
</style>
