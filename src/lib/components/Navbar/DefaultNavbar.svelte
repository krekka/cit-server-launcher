<script lang="ts">
    import CarbonCloseLarge from '~icons/carbon/close-large';
    import CarbonMinimize from '~icons/carbon/minimize';
    import { appWindow } from '@tauri-apps/api/window'
    import { navigate } from 'svelte-routing';
    import { CurrentGameStore } from '../../games';
    import RiHome2Line from '~icons/ri/home-2-line';
    import { fade } from 'svelte/transition';
    import { NavbarStore } from './stores';
    import { NavbarLogotype } from './components';

</script>

<header data-tauri-drag-region class="absolute z-50 shadow-lg border-b-2 border-stone-800 top-0 w-full bg-neutral-900 px-3 py-1 flex items-center justify-between">    
    <div data-tauri-drag-region class="flex items-center w-1/3">
        <NavbarLogotype />
    </div>
    
    <!-- Back button -->
    { #if $NavbarStore.showBackButton }
        <div data-tauri-drag-region class="w-1/3 flex items-center justify-center">
            <button in:fade on:click={() => {
                navigate(`/game/${ $CurrentGameStore.id }`);
            }} class="ml-6 text-neutral-200 transition hover:bg-neutral-800 rounded-md flex items-center py-1 px-2">
                <RiHome2Line class="w-4 h-4" />
                
                <p class="text-sm ml-1">На головну</p>
            </button>
        </div>
    { /if }

    <div data-tauri-drag-region class="w-1/3 flex items-center justify-end">
        <!-- Controls -->
        <button on:click={() => {
            appWindow.minimize();
        }} class="mx-1 p-2">
            <CarbonMinimize class="w-4 h-4 text-neutral-200" />
        </button>

        <button on:click={() => {
            // todo minimize to tray
            appWindow.close();
        }} class="mx-1 p-2">
            <CarbonCloseLarge class="w-4 h-4 text-neutral-200" />
        </button>
    </div>
</header>