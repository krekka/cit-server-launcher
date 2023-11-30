<script lang="ts">
    import { navigate } from "svelte-routing";
    import { fade, slide } from "svelte/transition";

    let isHovered = false;
</script>

<!-- Small Logotype -->
<div class="flex items-center gap-2">
    <!-- Playbox logotype -->
    <button on:click={() => {
        navigate("/playbox")
    }}
    on:mouseover={() => isHovered = true} on:mouseleave={() => isHovered = false}
    class="relative flex items-center group px-2 py-1 rounded-md transition hover:bg-neutral-800">
        <img src="https://assets.k8s.odzi.dog/odzi-assets/logotypes/playbox.svg" alt="playbox & krok logotype" class="inline w-6 h-6">

        { #if isHovered }
            <p in:slide={{ delay: 50 }} class="uppercase text-xs ml-1 font-semibold text-neutral-200">playbox</p>
        { :else }
            <div transition:fade class="absolute transition top-0 right-0 mt-1 mr-1 rounded-full bg-red-500 w-2 h-2"></div>
        { /if }
    </button>

    <!-- "KROK" Servers text -->
    <p class="text-sm text-neutral-200">Сервера "КРОК"</p>
</div>