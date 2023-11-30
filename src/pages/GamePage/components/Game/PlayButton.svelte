<script lang="ts">
    import { CircleSpinner } from "../../../../lib/components";
    import { DownloaderStore } from "../../../../lib/downloader";
    import { DownloadState } from "../../../../lib/downloader/types";
    import DownloadProgressBar from "./DownloadProgressBar.svelte";

    import CarbonDownload from '~icons/carbon/download';
    import CarbonPause from '~icons/carbon/pause';
    import { CurrentGameStore } from "../../../../lib/games";

    const disabledStates = [DownloadState.DONE, DownloadState.READY_FOR_DOWNLOAD, DownloadState.PAUSED, DownloadState.DOWNLOADING];

    function getColorsByState(state: DownloadState): string {
        switch (state) {
            case DownloadState.READY_FOR_DOWNLOAD:
            case DownloadState.PAUSED:
                return "bg-gradient-to-tr from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-600";
        
            case DownloadState.IDLE:
            case DownloadState.CHECKING_FILES:
            case DownloadState.CHECKING_UPDATES:
                return "bg-neutral-600";

            case DownloadState.DOWNLOADING:
                return "bg-neutral-600 hover:bg-neutral-700";

            case DownloadState.DONE:
                return "bg-gradient-to-tr from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-800";
        }
    }
</script>

<div class="w-full flex flex-col">
    <div class="flex items-end justify-between">
        <button
            disabled={!disabledStates.includes($DownloaderStore.state)}
            class="mt-5 rounded-md px-6 py-2 text-md text-neutral-200 { getColorsByState($DownloaderStore.state) } disabled:cursor-not-allowed flex items-center gap-3"
            on:click={() => {
                if ($DownloaderStore.state == DownloadState.READY_FOR_DOWNLOAD || $DownloaderStore.state == DownloadState.PAUSED) {
                    // Resuming this download
                    DownloaderStore.startDownloading();
                } else if ($DownloaderStore.state == DownloadState.DOWNLOADING) {
                    // Pausing this download
                    DownloaderStore.pauseDownloading();
                } else if ($DownloaderStore.state == DownloadState.DONE) {
                    // Running this game
                    CurrentGameStore.launch();
                }
            }}
        >
            { #if $DownloaderStore.state == DownloadState.CHECKING_UPDATES }
                <CircleSpinner />

                <p>Перевірка оновлень.</p>
            { :else if $DownloaderStore.state == DownloadState.CHECKING_FILES }
                <CircleSpinner />
                        
                <p>Перевірка файлів...</p>
            { :else if $DownloaderStore.state == DownloadState.READY_FOR_DOWNLOAD }
                <CarbonDownload />

                <p>Завантажити гру</p>
            { :else if $DownloaderStore.state == DownloadState.PAUSED }
                <CarbonPause />

                <p>Продовжити завантаження</p>
            { :else if $DownloaderStore.state == DownloadState.DOWNLOADING }
                <CircleSpinner />
                    
                <p>Завантаження файлів...</p>
            { :else if $DownloaderStore.state == DownloadState.DONE }
                <p>Почати гру!</p>
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