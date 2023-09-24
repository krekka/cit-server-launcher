<script lang="ts">
    import { CircleSpinner } from "../../../lib/components";
    import { DownloaderStore } from "../../../lib/downloader";
    import { DownloadState } from "../../../lib/downloader/types";
    import DownloadProgressBar from "./DownloadProgressBar.svelte";
</script>

<div class="w-full flex flex-col">
    <div class="flex items-end justify-between">
        <button disabled={$DownloaderStore.state != DownloadState.DONE} class="mt-5 rounded-md px-6 py-1 bg-green-600 disabled:bg-stone-800 disabled:cursor-not-allowed flex items-center gap-2">
            { #if $DownloaderStore.state == DownloadState.CHECKING_UPDATES }
                <CircleSpinner />

                <p class="text-md text-stone-200">Перевірка оновлень.</p>
            { :else if $DownloaderStore.state == DownloadState.CHECKING_FILES }
                <CircleSpinner />
                        
                <p class="text-md text-stone-200">Перевірка файлів...</p>
            { :else if $DownloaderStore.state == DownloadState.DOWNLOADING }
                <CircleSpinner />
                    
                <p class="text-md text-stone-200">Завантаження файлів...</p>
            { :else if $DownloaderStore.state == DownloadState.DONE }
                <p class="text-md text-stone-200">Почати гру!</p>
            { /if }
        </button>

        <!-- Download information -->
        { #if $DownloaderStore.state == DownloadState.DOWNLOADING }
            <DownloadProgressBar part="information" />
        { /if }
    </div>

    { #if $DownloaderStore.state == DownloadState.DOWNLOADING }
        <DownloadProgressBar part="bar" />
    { /if }
</div>