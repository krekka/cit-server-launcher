<script lang="ts">
    import moment from 'moment';
    import type { PostsEntity } from "../../../../lib/types";
    import { navigate } from 'svelte-routing';

    $: type = getPostType(post.type);

    function getPostType(type: PostsEntity['type']): { title: String; color: string; } {
        switch (type) {
            case "UPDATE":
                return {
                    title: "Оновлення",
                    color: "bg-pink-600 bg-opacity-70"
                };
            case "ANOUNCEMENT":
                return {
                    title: "Оголошення",
                    color: "bg-indigo-600 bg-opacity-70"
                }
        }
    }
    
    export let post: PostsEntity;
</script>

<button on:click={() => {
    navigate(`/post/${ post.id }`);
}} class="cursor-pointer text-left transition hover:bg-neutral-600 hover:shadow-xl rounded-xl bg-neutral-700 p-5 flex flex-col justify-end" >
    <!-- Title -->
    <h1 class="text-xl font-bold text-neutral-200">{ post.title }</h1>

    <div class="my-2 flex gap-2 items-center">
        { #if type != null }
            <span class="rounded-full { type?.color } px-2 py-0.5 text-xs text-neutral-200">{ type?.title }</span>
        { /if }
        
        <span class="rounded-full bg-green-600 bg-opacity-70 px-2 py-0.5 text-xs text-neutral-200">{ moment(post.created).format("D.MM.YYYY") }</span>
    </div>

    <p class="text-xs text-neutral-400 line-clamp-6">{ @html post.description }</p>
</button>