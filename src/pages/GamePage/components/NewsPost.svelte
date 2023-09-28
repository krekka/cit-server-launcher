<script lang="ts">
    import type { PostsEntity } from "../../../lib/types";

    function getPostType(type: PostsEntity['type']) {
        console.log("type", type);
        switch (type) {
            case "UPDATE":
                return "Оновлення";
        }
    }
    
    export let post: PostsEntity;
</script>

<article class="rounded-xl bg-stone-700 p-6 flex flex-col justify-end" >
    <!-- Title -->
    <h1 class="text-xl font-bold text-stone-200">{ post.title }</h1>

    <div class="my-2 flex gap-2 items-center">
        { #if post.type != null }
            <span class="rounded-full bg-green-500 px-2 py-0.5 text-xs text-stone-200">{getPostType(post.type)}</span>
        { /if }
        
        <span class="rounded-full bg-indigo-500 px-2 py-0.5 text-xs text-stone-200">{ post.created }</span>
    </div>

    <p class="text-xs text-stone-400">{ @html post.description }</p>
</article>