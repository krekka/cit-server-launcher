<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { BackgroundText } from "./BackgroundTexts";

    let interval: number;
    let direction = +1;
    let x = 0;

    onMount(() => {
        const element = document.getElementById("moving-background");

        // lmfao wtf is this?
        interval = setInterval(() => {
            x += direction * 0.15;
            element?.scroll(0, x);
            
            if (direction > 0 && x >= 1000) {
                direction *= -1;
            } else if (direction < 0 && x <= 0) {
                direction *= -1;
            }
        }, 5);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    })
</script>

<!-- w-[150%] left-[-25%]  -->
<div id="moving-background" class="overflow-hidden right-[-25%] opacity-10 z-10 -skew-y-12 rotate-12 inset-0 h-screen absolute">
    <div class="w-[150%] h-[150%] flex flex-wrap gap-12">
        { #each BackgroundText.split(" ") as word }
            <span class="text-5xl text-neutral-200">{ word }</span>
        { /each }
    </div>
</div>