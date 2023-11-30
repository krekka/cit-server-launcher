<script lang="ts">
    import { CircleSpinner } from "../lib/components";
    
    import { AuthStore } from "../lib/stores";
    import { onDestroy, onMount } from "svelte";
    import { CurrentGameStore } from "../lib/games";
    import { PlayButton } from "./GamePage";
    import { NewsStore } from "../lib/games/news";
    import { NewsPost, GameBannerSlider, GridMenu, Footer } from "./GamePage/components";
    import { NavbarStore } from "../lib/components/Navbar/stores";
    import { BadgeType } from "../lib/types";

    onMount(() => {
        NavbarStore.hideBackButton();

        // Fetching current game
        if ($CurrentGameStore?.id != gameId) CurrentGameStore.fetchById(gameId);
    })

    onDestroy(() => {
        NavbarStore.showBackButton();
    })

    export let gameId: string;
</script>

<div id="container" class="w-full h-full bg-neutral-900 pt-10 overflow-auto">
    { #if $CurrentGameStore == null }
        <!-- Loading spinner -->
        <div class="w-full h-full flex items-center justify-center">
            <CircleSpinner size={25} />
        </div>
    { :else }
        <section class="w-full h-full relative">
            <div class="z-20 absolute inset-0 w-full h-full bg-black opacity-70"></div>
            <GameBannerSlider images={ $CurrentGameStore.bannerImages } />

            <div class="z-30 absolute w-full h-full">
                <!-- Header -->
                <header class="w-full px-8 py-4 flex items-center justify-between">
                    <!-- Links? -->
                    <div class="flex items-center gap-12">
                        { #each $CurrentGameStore.links as entry }
                            <a class="text-neutral-200 cursor-pointer transition hover:text-neutral-400" href={ entry.url }>{ entry.text }</a>
                        { /each }
                    </div>

                    <!-- Account information -->
                    <div class="flex items-center gap-3">
                        <!-- Avatar -->
                        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-600"></div>
                        
                        <!-- Information -->
                        <div class="">
                            <h1 class="text-neutral-200 font-semibold text-sm">{ AuthStore.model?.username }</h1>
                            <p class="text-neutral-200 text-opacity-80 text-xs">{ AuthStore.model?.email }</p>
                        </div>

                        <!-- Divider -->
                        <div class="w-[3px] h-8 rounded-full bg-neutral-600 mx-2"></div>

                        <!-- "More Functions" Button -->
                        <GridMenu />
                    </div>
                </header>

                <!-- Main Content -->
                <div class="h-full flex flex-col items-start justify-center w-1/2 p-12 gap-6">
                    <!-- Tags? -->
                    <div class="flex items-center gap-3">
                        { #each $CurrentGameStore.badges as badge }
                            { #if badge.type == BadgeType.STATIC }
                                <div class="rounded-full { badge.color ?? "bg-neutral-600" } px-4 py-0.5">
                                    <p class="text-white text-sm">{ badge.text }</p>
                                </div>
                            { /if }
                        { /each }
                    </div>

                    <!-- Game name -->
                    <h1 class="text-5xl font-bold text-white">{ $CurrentGameStore.name }</h1>

                    <!-- Description -->
                    <p class="text-neutral-200 text-lg">{ @html $CurrentGameStore.description }</p>

                    <!-- Play button -->
                    <PlayButton />
                </div>

                <!-- Footer -->
                <div>

                </div>
            </div>
        </section>

        <section class="p-8">
            <div class="mb-4">
                <h1 class="text-2xl text-neutral-200 font-bold">Новини</h1>
                <p class="text-sm text-neutral-400">Цікаво що відбувається з сервером? Тоді ви потрапили туди, куди потрібно! Усі новини сервера знаходяться саме тут.</p>
            </div>

            <!-- Optional: news cards -->
            <div class="grid grid-cols-3 gap-4">
                { #each $NewsStore as post }
                    <NewsPost {post} />
                { /each }
            </div>
        </section>

        <!-- Footer section -->
        <Footer />
    { /if }
</div>