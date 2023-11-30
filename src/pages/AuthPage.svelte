<script lang="ts">
    import CarbonLaunch from '~icons/carbon/launch';
    import CarbonRetryFailed from '~icons/carbon/retry-failed';

    import { PocketbaseInstance } from "../lib/pocketbase";
    import { open } from "@tauri-apps/api/shell";
    import { navigate } from 'svelte-routing';

    let state: "idle" | "waiting" = "idle";
</script>

<div class="w-full h-screen bg-neutral-900 flex items-center justify-center">
    <!-- Auth card -->
    <div class="mt-6 w-full md:w-2/5 bg-neutral-800 shadow-md">
        <!-- Card header -->
        <div
            style="background: url('./mesh-gradient.png'); background-size: cover;"
            class="w-full rounded-t-md px-6 py-4 flex items-center justify-center relative"
        >
        </div>

        <!-- Card content -->
        <div class="px-4 py-6 text-white">
            { #if state == "idle" }
                <!-- Some explanations -->
                <h1 class="text-3xl text-neutral-100 font-medium">Привіт, давай почнемо з авторизації!</h1>
                <p class="text-sm text-neutral-400">
                    Ми дуже раді Вас вітати на нашому внутрішньо-університетському майнкрафт сервері!
                    
                    <br/><br/>

                    Перед початком гри Вам потрібно буде авторизуватись, потім скачати усі файли гри і вже потім ви зможете насолодитись прекрасною зборкою із 250+ модів, яка точно не дасть Вам засумувати!

                    <br/><br/>

                    Отже, перший шаг - авторизуватись. <span class="underline">Будь ласка, натисніть на кнопку нижче для того, щоб авторизуватись</span> у Ваш <span class="font-bold">університетьский аккаунт Майкрософт</span> і почати грати на сервері!
                </p>

                <!-- Microsoft login button -->
                <button on:click={async () => {
                    state = "waiting";

                    // Opening auth page for user
                    await PocketbaseInstance.collection("users").authWithOAuth2({
                        provider: "microsoft",
                        urlCallback: (url) => {
                            console.log("URL:", url);
                            open(url);
                        }
                    });

                    navigate("/game/ze2vh521wab7zu6");
                }} class="
                    mt-6 w-full rounded-lg transition flex items-center justify-center py-1.5 px-4 text-white
                    bg-indigo-700 hover:bg-indigo-900 hover:text-neutral-200
                ">
                    <CarbonLaunch />

                    <p class="ml-1.5">Продовжити з Microsoft</p>
                </button>
            { :else if state == "waiting" }
                <h1 class="text-3xl text-neutral-100 font-medium">Очікуємо авторизації...</h1>
                <p class="text-sm text-neutral-400">
                    Через пару секунд повинен відкритись браузер з запитом на авторизацію
                    
                    <br/><br/>

                    Будь ласка, використовуйте <span class="font-bold">університетський аккаунт Майкрософт</span> при авторизації.

                    <br/><br/>

                    Щось пішло не так?

                    <button on:click={() => {
                        state = "idle";
                    }} class="flex rounded-lg items-center justify-center mt-6 w-full transition py-1.5 px-4 text-white bg-indigo-700 hover:bg-indigo-900 hover:text-neutral-200">
                        <CarbonRetryFailed />

                        <p class="ml-1.5">Спробувати ще раз</p>
                    </button>
                </p>
            { /if }
        </div>
    </div>
</div>