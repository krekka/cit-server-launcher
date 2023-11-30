<script lang="ts">
    import { onMount } from "svelte";

    // husky aka hlib sp
    const huskyImages = [
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/1277-doge-with-gun.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/1434-heh-king.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/1752-dog-pat.gif",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/1758-2066nerddoggo.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/2360-doge-5head.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/2795-nodoge.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/3029-round-corgi-plushie.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/5280-blobdoggoogly.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/7169-badpun-dog-smile.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/7817-pogdog.gif",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/8215-bonk.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/8250-dog-wait.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/9067-otayy.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/9081-doge-shy.png",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/9083-dogsmile.gif",
        "https://assets.k8s.odzi.dog/bluk-playbox/launcher/huskyAvatars/9955-dog-boop.png",
    ];

    onMount(() => {
        randomizeAvatar();
    })

    let currentIndex = 0;
    let avatarImg: string;

    function randomizeAvatar() {
        avatarImg = huskyImages[Math.floor(Math.random()*huskyImages.length)];
    };

    function switchAvatar() {
        avatarImg = huskyImages[currentIndex];

        currentIndex += 1;

        if (currentIndex > huskyImages.length) {
            currentIndex = 0;
        }
    }
</script>

<section class="p-12 mt-12 w-full border-t-2 border-neutral-700 bg-neutral-800 flex items-center justify-center">
    <p class="text-md text-neutral-400">Made with <img class="inline w-7 h-7" src="https://em-content.zobj.net/source/microsoft/319/red-heart_2764-fe0f.png" /> by <img on:click={randomizeAvatar} class="inline w-7 h-7" src={avatarImg} /> <span class="italic">dogleash</span> from <span class="underline">Центр Інформаційних Технологій</span></p>
</section>