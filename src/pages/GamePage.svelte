<script lang="ts">
    import { AuthStore } from "../lib/stores";

    import CarbonLogout from '~icons/carbon/logout';
    import CarbonSettings from '~icons/carbon/settings';

</script>

<div class="w-full h-full bg-stone-900 p-8 pt-20 overflow-auto">    
    <!-- Launch game card -->
    <div class="grid grid-cols-3 gap-4 grid-rows-1 h-2/3 relative">
        <section class="col-span-2 rounded-lg relative">
            <!-- Image -->
            <div class="absolute inset-0 w-full h-full z-0">
                <div class="absolute w-full h-full z-20 bg-gradient-to-b from-transparent to-black rounded-xl"></div>
                <div style="background: url('https://cdna.artstation.com/p/assets/images/images/040/684/956/large/ilya-vdovyuk-22525.jpg?1629594801'); background-size: cover;" class="absolute w-full h-full rounded-xl z-10"></div>
            </div>

            <!-- Text -->
            <div class="absolute bottom-0 z-10 p-8">
                <h1 class="text-3xl font-bold text-stone-200">Steampunk</h1>
            
                <!-- Badges -->
                <div class="my-2 flex items-center flex-wrap">
                    <span class="rounded-full bg-green-500 px-2 py-0.5 text-xs text-stone-200">0/2023 гравців</span>
                    <span class="mx-2 rounded-full bg-indigo-500 px-2 py-0.5 text-xs text-stone-200">Оновленно 17.09.2023</span>
                </div>

                <!-- Latest update description -->
                <div class="w-2/3">
                    <p class="text-stone-200 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quis dignissimos atque facilis eveniet aliquam labore tempore inventore placeat non.</p>
                </div>

                <!-- Play button -->
                <button class="mt-5 rounded-md px-6 py-1 bg-green-600">
                    <p class="text-md text-white">Почати гру!</p>
                </button>
            </div>
        </section>

        <!-- User card -->
        <section class="flex flex-col justify-end">
            <div class="rounded-xl bg-stone-700 px-8 py-4 pt-8 relative">
                <!-- Profile avatar -->
                <div class="absolute top-[-3rem] inset-x-0 w-full flex items-center justify-center">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-600"></div>
                </div>

                <!-- Username and settings buttons -->
                <div class="mt-2">
                    <div class="text-center mb-6">
                        <h1 class="text-stone-200 font-medium text-xl">{ AuthStore.model?.username }</h1>
                        <p class="text-sm text-stone-400">{ AuthStore.model?.email }</p>
                    </div>

                    <!-- Settings button -->
                    <button class="my-1.5 w-full flex items-center justify-center rounded-lg px-4 py-1.5 transition bg-indigo-700 hover:bg-indigo-900 text-stone-200">
                        <CarbonSettings class="w-4 h-4" />

                        <p class="ml-1.5 text-sm">Налаштування</p>
                    </button>

                    <!-- Logout button -->
                    <button class="my-1.5 w-full flex items-center justify-center rounded-lg px-4 py-1.5 transition bg-stone-600 hover:bg-stone-800 text-stone-200">
                        <CarbonLogout class="w-4 h-4" />
                        
                        <p class="ml-1.5 text-sm">Вийти з аккаунту</p>
                    </button>
                </div>
            </div>
        </section>
    </div>

    <div class="mt-16 mb-4">
        <h1 class="text-2xl text-stone-200 font-bold">Новини</h1>
        <p class="text-sm text-stone-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, quas?</p>
    </div>

    <!-- Optional: news cards -->
    <div class="grid grid-cols-4 h-full gap-4">
        { #each [1,2,3,4,5] as news }
            <article class="rounded-xl bg-stone-700">
                Hello there!
            </article>
        { /each }
    </div>
</div>