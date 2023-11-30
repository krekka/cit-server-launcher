<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { GameBannerImage } from "../../../../lib/types";

    let interval: number | null = null;
    let currentImageIndex = 0;
    $: currentImage = images[currentImageIndex];

    onMount(() => {
        interval = setInterval(() => {
            // Changing current image to next image
            currentImageIndex++;

            if (currentImageIndex >= images.length) {
                currentImageIndex = 0;
            }
        }, 15000);
    });

    onDestroy(() => {
        if (interval != null) clearInterval(interval);
    });

    export let images: Array<GameBannerImage> = [];
</script>

<div style="background-image: url('{ currentImage?.url }'); background-size: cover; background-repeat: no-repeat; background-position: center;" class="absolute w-full h-full z-10"></div>