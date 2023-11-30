<script lang="ts">
    import { CommonSidebar } from "../lib/components";

    import RiSettings3Line from '~icons/ri/settings-3-line';
    import RiSettingsLine from '~icons/ri/settings-line';
    import RiDownloadCloud2Line from '~icons/ri/download-cloud-2-line';
    import RiFoldersLine from '~icons/ri/folders-line';
    import RiPlayLine from '~icons/ri/play-line';
    import RiFunctionLine from '~icons/ri/function-line';
    import RiShieldKeyholeLine from '~icons/ri/shield-keyhole-line';
    import { navigate } from "svelte-routing";

    export let pageComponent: any = null;
</script>

<div class="w-full h-screen flex items-center justify-center bg-neutral-800 overflow-hidden pt-10">
    <!-- Sidebar -->
    <CommonSidebar
        header={{
            icon: RiSettings3Line,
            title: "Налаштування"
        }}
        categories={[
            {
                title: "Аккаунт",
                pages: [
                    {
                        icon: RiSettingsLine,
                        title: "Основні",
                        url: "/settings/account"
                    },
                    {
                        icon: RiShieldKeyholeLine,
                        title: "Безпека",
                        url: "/settings/account/security"
                    },
                    {
                        icon: RiFunctionLine,
                        title: "Інтеграції",
                        url: "/settings/account/integrations"
                    }
                ]
            },
            {
                title: "Гра",
                pages: [
                    {
                        icon: RiFoldersLine,
                        title: "Розташування",
                        url: "/settinsg/game#placement"
                    },
                    {
                        icon: RiDownloadCloud2Line,
                        title: "Оновлення",
                        url: "/settings/game#updates"
                    },
                    {
                        icon: RiPlayLine,
                        title: "Параметри запуску",
                        url: "/settings/game#startup"
                    }
                ]
            }
        ]}
    />
    
    <!-- Content -->
    <div class="w-full overflow-auto">
        { #if pageComponent == null }
            <div class="w-full h-full flex items-center justify-center">
                <!-- Quick Settings container -->
                <div class="w-2/3 p-6 rounded-md bg-neutral-900">
                    <div class="text-neutral-200 text-center">
                        <h1 class="text-2xl font-medium">Не знаєте де почати?</h1>
                        <p class="text-sm">В налаштуваннях завжди можна загубитись... Тому ось вам коротенький список із самих важливих налаштувань, котрі вам 100% знадобляться.</p>
                    </div>

                    <div class="mt-4 grid grid-cols-3 gap-2">
                        { #each [
                            {
                                icon: RiSettingsLine,
                                title: "Основні",
                                url: "/settings/account"
                            },
                            {
                                icon: RiFunctionLine,
                                title: "Інтеграції",
                                url: "/settings/account/integrations"
                            },
                            {
                                icon: RiPlayLine,
                                title: "Пар. запуску",
                                url: "/settings/game#startup"
                            },
                        ] as quickPage }
                            <button on:click={() => {
                                navigate(quickPage.url)
                            }} class="py-3 px-4 transition hover:bg-neutral-700 rounded-md bg-neutral-800 flex items-center text-neutral-200">
                                <svelte:component class="w-5 h-5" this={quickPage.icon} />

                                <h1 class="ml-2 text-sm">{ quickPage.title }</h1>
                            </button>
                        { /each }
                    </div>
                </div>
            </div>
        { :else }
            <svelte:component this={pageComponent} />
        { /if }
    </div>
</div>