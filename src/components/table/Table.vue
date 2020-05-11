<template>
  <column v-if="dataHasItems" class="w-full h-full">
    <div class="pl-6 pr-6">
      <table class="w-full rounded">
        <thead>
          <tr>
            <th v-for="cellName in tableHeaderCells" :key="cellName">
              {{ cellName }}
            </th>
          </tr>
        </thead>

        <tbody v-if="isEditable">
          <table-row-editable
            v-for="row in currentPageRows"
            :key="row.renderKey"
            :row="row"
            @onUpdateRow="onUpdateRow"
            @onClickRow="onClickRow"
          />
        </tbody>

        <tbody v-if="!isEditable">
          <table-row
            v-for="row in currentPageRows"
            :key="row.renderKey"
            :row="row"
            @onClickRow="onClickRow"
          />
        </tbody>
      </table>
    </div>

    <table-pagination-footer
      :current-page-index="currentPageIndex"
      :total-number-of-items="totalNumberOfItems"
      :number-of-items-per-page="numberOfItemsPerPage"
      :number-of-pages="numberOfPages"
      @onNextPage="onNextPage"
      @onPrevPage="onPrevPage"
    />
  </column>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Column from "@/components/layout/Column.vue";
import TableRow from "@/components/table/partials/TableRow.vue";
import TableRowEditable from "@/components/table/partials/TableRowEditable.vue";
import TablePaginationFooter from "@/components/table/partials/TablePaginationFooter.vue";

import chunkArray from "@/utils/chunkArray";
import ITableRow from "@/interfaces/TableRow";

@Component({
  components: {
    TableRow,
    TableRowEditable,
    TablePaginationFooter,
    Column,
  },
})
export default class Table extends Vue {
  @Prop({ type: Array, required: true })
  dataSet!: ITableRow[];

  @Prop({ type: Boolean, required: false, default: false })
  isEditable!: boolean;

  currentPageIndex = 0;
  numberOfItemsPerPage = 40;

  get pageList() {
    return chunkArray(this.dataSet, this.numberOfItemsPerPage);
  }

  get numberOfPages() {
    return this.pageList.length;
  }

  get totalNumberOfItems() {
    return this.dataSet.length;
  }

  get currentPageRows() {
    if (!this.dataHasItems) {
      return [];
    }

    return this.pageList[this.currentPageIndex];
  }

  get tableHeaderCells() {
    const targetItem = { ...this.dataSet[0] };
    delete targetItem.renderKey;

    return Object.keys(targetItem);
  }

  get dataHasItems(): boolean {
    return this.dataSet && this.dataSet.length > 0;
  }

  onNextPage() {
    this.currentPageIndex += 1;
  }

  onPrevPage() {
    this.currentPageIndex -= 1;
  }

  onUpdateRow(newRow: ITableRow) {
    this.$emit("onUpdateRow", newRow);
  }

  onClickRow(row: ITableRow) {
    this.$emit("onClickRow", row);
  }
}
</script>

<style lang="sass">
table
  box-shadow: var(--base-box-shadow)
  background-color: var(--color-neutral-lightest)
  padding-bottom: var(--dim-table-pagination-footer-height)
  border-collapse: collapse

  th
    text-transform: uppercase
    background-color: var(--color-neutral-light)
    border-bottom: 1px solid var(--color-neutral-lighter)
    padding: var(--sp-2) var(--sp-3)
    text-align: left
    color: var(--color-neutral)
    font-weight: 500
    font-size: var(--fs-xs)
    letter-spacing: 0.05rem
    box-sizing: border-box

    &:first-child
      border-top-left-radius: var(--base-border-radius)

      &:last-child
        border-top-right-radius: var(--base-border-radius)

  td
    padding: var(--sp-2) var(--sp-3)
    background-color: var(--color-background-lightest)
    cursor: pointer

    *
      font-size: var(--fs-sm)

  tr
    &:not(:last-child)

      td
        border-bottom: 1px solid var(--color-neutral-lighter)

    &:hover

      td
        background-color: var(--color-neutral-light)
</style>
