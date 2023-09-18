<script lang="ts">
    import CarbonCloseLarge from '~icons/carbon/close-large';
    import CarbonMinimize from '~icons/carbon/minimize';
    import { appWindow } from '@tauri-apps/api/window'
</script>

<header data-tauri-drag-region class="absolute z-50 shadow-lg border-b-2 border-stone-800 top-0 w-full bg-stone-900 px-3 py-1 flex items-center justify-end">
    <!-- Small Logotype -->

    <!-- Controls -->
    <button on:click={() => {
        appWindow.minimize();
    }} class="mx-1 p-2">
        <CarbonMinimize class="w-4 h-4 text-stone-200" />
    </button>

    <button on:click={() => {
        // todo minimize to tray
        appWindow.close();
    }} class="mx-1 p-2">
        <CarbonCloseLarge class="w-4 h-4 text-stone-200" />
    </button>
</header>