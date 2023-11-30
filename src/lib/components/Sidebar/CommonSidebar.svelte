<script lang="ts">
    import { navigate } from "svelte-routing";

    export let header: {
        title: string,
        icon: any
    } | null = null;

    export let categories: Array<{
        title: string;
        pages: Array<{
            icon: any,
            title: string,
            url: string,
        }>
    }> = [];
</script>

<sidebar class="w-1/3 h-full bg-neutral-900 border-b-2 border-stone-800 overflow-hidden">
    <!-- Header -->
    { #if header != null }
        <div class="p-3 px-5 border-b-2 text-neutral-200 flex items-center border-stone-800">
            <div class="p-1 rounded-md border-2 border-stone-700 border-opacity-50">
                <svelte:component class="w-5 h-5" this={header.icon} />
            </div>

            <h1 class="text-xl font-medium ml-2">{ header.title }</h1>
        </div>
    { /if }

    <!-- Content -->
    <div class="p-3 pt-5">
        { #each categories as category }
            <!-- Category -->
            <div>
                <!-- Category title -->
                <h1 class="px-4 text-xs uppercase text-neutral-400">{ category.title }</h1>

                <!-- Pages -->
                { #each category.pages as page }
                    <button on:click={() => {
                        navigate(page.url);
                    }} class="w-full my-2 py-2 px-4 rounded-md text-neutral-200 transition hover:bg-neutral-800 flex items-center">
                        <!-- Icon -->
                        <svelte:component this={page.icon} />

                        <h1 class="ml-2">{ page.title }</h1>
                    </button>
                { /each }
            </div>
        { /each }
    </div>
</sidebar>