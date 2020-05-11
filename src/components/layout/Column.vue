<template>
  <div class="flex-col">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Column extends Vue {}
</script>
