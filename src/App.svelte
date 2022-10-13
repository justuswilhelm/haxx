<script lang="ts">
    import { generate } from "./lib/generator";
    import { grammar } from "./lib/grammar";

    let sentence: string = generate(grammar);
</script>

<main>
    <h1>
        {sentence}
    </h1>
</main>
