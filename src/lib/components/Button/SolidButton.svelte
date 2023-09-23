<script lang="ts">
    import { afterUpdate } from "svelte";

    // Variables
    let colors: string;

    // Hooks
    afterUpdate(() => {
        updateColors();
    });

    function updateColors() {
        switch (type) {
            case "focus":
                colors = "text-white bg-indigo-700 hover:bg-indigo-900 hover:text-stone-200"
                break;
        
            default:
                colors = "bg-stone-600 hover:bg-stone-800 text-stone-200"
        }
    }

    export let type: "focus" | "normal" = "normal";
</script>

<button 
    on:click 
    class="my-1.5 w-full flex items-center justify-center rounded-lg px-4 py-1.5 transition
        {colors}"
    >
    <slot />
</button>