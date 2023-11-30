<script lang="ts">
    import { onMount } from "svelte";
    import { CircleSpinner } from "../lib/components";
    import { PocketbaseInstance } from "../lib/pocketbase";
    import { navigate } from "svelte-routing";

    onMount(async () => {
        // Checking if this user is authorized or no
        if (PocketbaseInstance.authStore.isValid) {
          // Hard-coded game id
          navigate("/game/ze2vh521wab7zu6");
        } else {
          navigate("/auth");
        }
    })
</script>

<div class="w-full h-screen flex items-center justify-center">
    <CircleSpinner size={25} />
</div>