<template>
  <footer class="position-absolute bottom-0 right-0 mt-auto pl-6 pr-6">
    <row class="items-center h-full flex-1 justify-between">
      <div>
        <p
          data-test="table-pagination-footer__message"
          class="text-sm leading-5 text-gray-700"
        >
          Showing
          <span class="font-bold">{{ startItemsQuantity + 1 }}</span>
          to
          <span class="font-bold">{{ endItemsQuantity }}</span>
          of
          <span class="font-bold">{{ totalNumberOfItems }}</span>
          results
        </p>
      </div>

      <row
        v-if="shouldShowButtons"
        data-test="table-pagination-footer__buttons"
      >
        <l-button
          :is-disabled="!canPaginatePrev"
          @click.native="onPrevPage"
          class="mr-1"
          data-test="table-pagination-footer__prev-button"
        >
          Prev
        </l-button>

        <l-button
          :is-disabled="!canPaginateNext"
          @click.native="onNextPage"
          data-test="table-pagination-footer__next-button"
        >
          Next
        </l-button>
      </row>
    </row>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Row from "@/components/layout/Row.vue";
import LButton from "@/components/button/Button.vue";

@Component({
  components: {
    Row,
    LButton,
  },
})
export default class TablePaginationFooter extends Vue {
  @Prop({ type: Number, required: true })
  currentPageIndex!: number;

  @Prop({ type: Number, required: true })
  numberOfItemsPerPage!: number;

  @Prop({ type: Number, required: true })
  numberOfPages!: number;

  @Prop({ type: Number, required: true })
  totalNumberOfItems!: number;

  get startItemsQuantity() {
    return this.numberOfItemsPerPage * this.currentPageIndex;
  }

  get endItemsQuantity() {
    const expectedQuantity =
      this.startItemsQuantity + this.numberOfItemsPerPage;

    if (expectedQuantity > this.totalNumberOfItems) {
      return this.totalNumberOfItems;
    }

    return expectedQuantity;
  }

  get canPaginatePrev() {
    return this.currentPageIndex > 0;
  }

  get canPaginateNext() {
    return this.currentPageIndex < this.numberOfPages - 1;
  }

  get shouldShowButtons() {
    return this.numberOfPages > 1;
  }

  onNextPage() {
    if (!this.canPaginateNext) {
      return;
    }

    this.$emit("onNextPage");
  }

  onPrevPage() {
    if (!this.canPaginatePrev) {
      return;
    }

    this.$emit("onPrevPage");
  }
}
</script>

<style lang="sass" scoped>
footer
  height: var(--dim-table-pagination-footer-height)
  background: var(--color-neutral-light)
  border: 1px solid var(--color-neutral-lighter)
  left: var(--dim-primary-sidebar-width)
  box-sizing: border-box
</style>
