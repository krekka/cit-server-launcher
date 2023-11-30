<script lang="ts">
    import { navigate } from "svelte-routing";
    import { SolidButton } from "../lib/components";
    import { MovingBackground } from "./PlayboxInfo";
    import { CurrentGameStore } from "../lib/games";
    import { open as openUrl } from "@tauri-apps/api/shell";
</script>

<!-- Background -->
<div class="w-full h-screen relative">
    <MovingBackground />

    <div class="absolute inset-0 z-20 pt-10 w-full h-screen flex items-center justify-center">
        <!-- Container -->
        <div class="w-1/3 rounded-xl p-8 bg-neutral-800">
            <!-- Header -->
            <div class="w-full flex items-center pb-6 justify-center border-b-2 border-neutral-600">
                <!-- Logotype -->
                <img src="https://assets.k8s.odzi.dog/odzi-assets/logotypes/playbox.svg" alt="playbox & krok logotype" class="inline w-10 h-10">
            </div>

            <!-- Content -->
            <div class="my-6">
                <p class="text-md text-neutral-200">
                    <span class="font-bold">Playbox</span> - це нова мережа Українських серверів та проєктів, які пов'язані як із Майнкрафтом, так і із іншими іграми <span class="italic">(та і з іграми взагалі)</span><br /><br />
                    Ми плануємо розвиватись і надалі - роблячи нові сервера, нові застосунки для наших користувачів та навіть для розробників - для більш простої та швидкої розробки плагінів, модів, DDOS-систем, систем авторизації та подібного<br /><br />
                    Поки що в нашому портфоліо не дуже багато проєктів - але ми тільки почали.<br /><br />
                    Цікаво що ми робимо? Тоді переходьте по посиланню <a class="underline" href="#" on:click={() => {
                        openUrl("https://playbox.network");
                    }}>playbox.network</a>, та дивіться, що ми вже встигли зробити!
                </p>
            </div>

            <!-- "OK" Button -->
            <SolidButton type="focus" on:click={() => {
                navigate("/");
            }}>
                Ок, зрозумів
            </SolidButton>
        </div>
    </div>
</div>