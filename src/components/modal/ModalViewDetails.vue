<template>
  <modal @onCloseModal="onCloseModal">
    <div class="p-4">
      <p class="mb-2" v-for="(value, key) in details" :key="key">
        {{ key }}: {{ value }}
      </p>
    </div>

    <footer class="p-4 pr-4 pb-2 pt-2">
      <row class="justify-end">
        <l-button @click.native="onCloseModal">Done</l-button>
      </row>
    </footer>
  </modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Modal from "@/components/modal/Modal.vue";
import Row from "@/components/layout/Row.vue";
import LButton from "@/components/button/Button.vue";

@Component({
  components: {
    Modal,
    LButton,
    Row,
  },
})
export default class ModalViewDetails extends Vue {
  @Prop({ type: Object, required: true })
  details!: object;

  onCloseModal() {
    this.$emit("onCloseModal");
  }
}
</script>
