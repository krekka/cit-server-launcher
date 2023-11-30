<script lang="ts">
    import CarbonGrid from '~icons/carbon/grid'

    import { HeadlessMenu } from '../../../../lib/components';
    import { CurrentGameStore } from '../../../../lib/games';

    import { UserGridMenuEntries } from '../../../../lib/config';
    import { navigate } from 'svelte-routing';
</script>

<HeadlessMenu>
    <div slot="activator" let:switchState>
        <button on:click={switchState} class="rounded-md p-2 transition bg-neutral-600 hover:bg-neutral-800">
            <CarbonGrid class="text-neutral-100" />
        </button>
    </div>

    <!-- Menu content -->
    <div slot="content" class="py-8 w-80 bg-neutral-900 border-2 border-neutral-600 rounded-xl">
        <!-- Notifications -->
        <section class="px-4">
            <!-- Section header -->
            <div class="flex items-center gap-2">
                <p class="uppercase text-xs text-neutral-500">Повідомлення</p>
            
                <span class="rounded-full px-2 bg-indigo-500 opacity-60">
                    <p class="text-xs text-neutral-200">Скоро</p>
                </span>
            </div>

            <!-- Content -->
            <div class="p-8">
                <p class="text-sm text-neutral-400 text-center">У вас немає непрочитаних повідомлень.</p>
            </div>
        </section>

        <!-- Divider -->
        <div class="w-full h-[3px] rounded-full bg-neutral-800 my-4"></div>

        <!-- Grid Menu -->
        <div>
            <!-- Section header -->
            <p class="px-4 uppercase text-xs text-neutral-500">Функції</p>

            <!-- Content -->
            <div class="px-2 first-letter:w-full grid grid-cols-3 flex-wrap gap-6 py-6">
                { #each UserGridMenuEntries as entry }
                    <div class="relative flex justify-center items-center">
                        <button on:click={() => {
                            if (entry.url) navigate(entry.url);
                        }} class="flex flex-col items-center justify-center relative { entry.isDisabled ? "opacity-40" : "" }">
                            <!-- Icon -->
                            <div class="p-4 transition text-white rounded-md { entry.color ?? "bg-indigo-500" } ring-4 ring-neutral-800">
                                <svelte:component this={entry.icon} />
                            </div>

                            <!-- Text -->
                            <p class="text-xs text-neutral-200 pt-2">{entry.text}</p>
                        </button>

                        <!-- "Disabled" badge -->
                        { #if entry.isDisabled }
                            <span class="absolute mt-[-10px] top-0 right-0 rounded-full px-2 bg-red-500">
                                <p class="text-xs text-neutral-200">Скоро</p>
                            </span>
                        { /if }
                    </div>
                { /each }
            </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-[3px] rounded-full bg-neutral-800 my-4"></div>

        <!-- Other links -->
        <div>
            <!-- Section header -->
            <p class="px-4 uppercase text-xs text-neutral-500">Інші посилання</p>
            
            <!-- Content -->
            <div class="px-4">
                { #each [...$CurrentGameStore.links] as link }
                    <a class="block my-4 text-neutral-200 transition hover:text-neutral-400" href={link.url}>{link.text}</a>
                { /each }
            </div>
        </div>
    </div>
</HeadlessMenu>