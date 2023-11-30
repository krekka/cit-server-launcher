<script lang="ts">
    import { fade } from "svelte/transition";

    let isActive = false;

    function switchState() {
        isActive = !isActive;
    }

    export let direction: "right" | "left" = "left";
</script>

<!-- Background -->
{ #if isActive }
    <div transition:fade on:click={switchState} class="z-10 absolute inset-0 w-full h-full bg-black bg-opacity-40"></div>
{ /if }

<div class="relative z-20">
    <slot name="activator" {switchState} />

    <!-- Menu itself -->
    { #if isActive }
        <div in:fade={{ duration: 100 }} class="absolute z-60 { direction == "right" ? "left-0" : "right-0" } pt-4">
            <slot name="content" />
        </div>
    { /if }
</div>