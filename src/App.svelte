<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import { DefaultNavbar } from "./lib/components";
    
    import LoadingPage from "./pages/LoadingPage.svelte";
    import AuthPage from "./pages/AuthPage.svelte";
    import GamePage from "./pages/GamePage.svelte";
    import SettingsPage from "./pages/SettingsPage.svelte";
    import PostPage from "./pages/PostPage.svelte";
    import { AccountSettingsPage } from "./pages/SettingsPage";
    import PlayboxInfoPage from "./pages/PlayboxInfoPage.svelte";
</script>

<Router>
  <!-- Navbar -->
  <DefaultNavbar />
  
  <!-- Content -->
  <main class="w-full overflow-hidden h-screen">
    <Route path="/" component={LoadingPage} />
    <Route path="/auth" component={AuthPage} />
    <Route path="/game/:id" let:params>
      <GamePage gameId={params.id} />
    </Route>
    <Route path="/post/:id" let:params>
      <PostPage id={params.id} />
    </Route>

    <!-- Settings pages -->
    <Route path="/settings" component={SettingsPage} />
    <Route path="/settings/account">
      <SettingsPage pageComponent={AccountSettingsPage} />  
    </Route>

    <!-- Other pages -->
    <Route path="/playbox" component={PlayboxInfoPage} />
  </main>
</Router>