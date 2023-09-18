<script lang="ts">
    import { Router, Route, navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import { DefaultNavbar } from "./lib/components";
    import { PocketbaseInstance } from "./lib/pocketbase";
    
    import LoadingPage from "./pages/LoadingPage.svelte";
    import AuthPage from "./pages/AuthPage.svelte";
    import GamePage from "./pages/GamePage.svelte";

    onMount(async () => {
        // Checking if this user is authorized or no
        if (PocketbaseInstance.authStore.isValid) {
          navigate("/game");
        } else {
          navigate("/auth");
        }
      })

    export let url = "/";
</script>

<Router {url}>
  <!-- Navbar -->
  <DefaultNavbar />

  <!-- Content -->
  <main class="w-full h-screen overflow-hidden">
    <Route path="/" component={LoadingPage} />
    <Route path="/auth" component={AuthPage} />
    <Route path="/game" component={GamePage} />
  </main>
</Router>