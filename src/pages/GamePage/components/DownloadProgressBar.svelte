<script lang="ts">
    import { DownloaderStore } from "../../../lib/downloader";

    $: filesLength = $DownloaderStore.progress.size ?? 0;
    $: filesDownloaded = [...$DownloaderStore.progress.values()].filter(x => x == true).length;

    export let part: "bar" | "information";
</script>

{ #if part == "bar" }
    <div class="mt-4 w-full rounded-full bg-stone-700 h-1">
        <div style="width: { (100/filesLength) * filesDownloaded }%;" class="rounded-full bg-green-500 h-1"></div>
    </div>
{ :else if part == "information" }
    <p class="text-stone-200 text-xs">Завантажено: <span class="underline">{filesDownloaded}/{filesLength} файлів</span></p>
{ /if }