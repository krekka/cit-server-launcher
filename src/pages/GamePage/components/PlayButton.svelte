<script lang="ts">
    import { CircleSpinner } from "../../../lib/components";
    import { DownloaderStore } from "../../../lib/downloader";
    import { DownloadState } from "../../../lib/downloader/types";
    import DownloadProgressBar from "./DownloadProgressBar.svelte";

    import CarbonDownload from '~icons/carbon/download';
    import CarbonPause from '~icons/carbon/pause';    
</script>

<div class="w-full flex flex-col">
    <div class="flex items-end justify-between">
        <button
            disabled={![DownloadState.DONE, DownloadState.READY_FOR_DOWNLOAD, DownloadState.PAUSED, DownloadState.DOWNLOADING].includes($DownloaderStore.state)}
            class="mt-5 rounded-md px-6 py-1  text-stone-200 bg-green-600 disabled:bg-stone-800 disabled:cursor-not-allowed flex items-center gap-2"
            on:click={() => {
                if ($DownloaderStore.state == DownloadState.READY_FOR_DOWNLOAD || $DownloaderStore.state == DownloadState.PAUSED) {
                    // Resuming this download
                    DownloaderStore.startDownloading();
                } else if ($DownloaderStore.state == DownloadState.DOWNLOADING) {
                    // Pausing this download
                    DownloaderStore.pauseDownloading();
                }     
            }}
        >
            { #if $DownloaderStore.state == DownloadState.CHECKING_UPDATES }
                <CircleSpinner />

                <p class="text-md">Перевірка оновлень.</p>
            { :else if $DownloaderStore.state == DownloadState.CHECKING_FILES }
                <CircleSpinner />
                        
                <p class="text-md">Перевірка файлів...</p>
            { :else if $DownloaderStore.state == DownloadState.READY_FOR_DOWNLOAD }
                <CarbonDownload />

                <p class="text-md">Завантажити гру</p>
            { :else if $DownloaderStore.state == DownloadState.PAUSED }
                <CarbonPause />

                <p class="text-md">Продовжити завантаження</p>
            { :else if $DownloaderStore.state == DownloadState.DOWNLOADING }
                <CircleSpinner />
                    
                <p class="text-md">Завантаження файлів...</p>
            { :else if $DownloaderStore.state == DownloadState.DONE }
                <p class="text-md text-stone-200">Почати гру!</p>
            { /if }
        </button>

        <!-- Download information -->
        { #if [DownloadState.DOWNLOADING, DownloadState.PAUSED].includes($DownloaderStore.state) }
            <DownloadProgressBar part="information" />
        { /if }
    </div>

    { #if [DownloadState.DOWNLOADING, DownloadState.PAUSED].includes($DownloaderStore.state) }
        <DownloadProgressBar part="bar" />
    { /if }
</div>