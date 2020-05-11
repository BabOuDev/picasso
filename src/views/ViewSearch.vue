<template>
  <column>
    <page-header title="Smart Search">
      <l-input v-model="searchValue" placeholder="Search for records..." />
    </page-header>

    <div class="mt-1 flex-1">
      <l-table
        :data-set="filteredData"
        :is-editable="false"
        @onClickRow="onShowItemDetails"
      />
    </div>

    <modal-view-details
      v-if="rowInFocus"
      :details="rowInFocus"
      @onCloseModal="onCloseModal"
    />
  </column>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Row from "@/components/layout/Row.vue";
import Column from "@/components/layout/Column.vue";
import PageHeader from "@/components/shell/PageHeader.vue";
import LButton from "@/components/button/Button.vue";
import LTable from "@/components/table/Table.vue";
import ModalViewDetails from "@/components/modal/ModalViewDetails.vue";
import LInput from "@/components/input/Input.vue";

import exampleDataPeople from "@/utils/example_data/exampleDataPeople";
import SearchItem from "@/models/SearchItem";
import ITableRow from "@/interfaces/TableRow";
import { v1 as uuidv1 } from "uuid";

@Component({
  components: {
    Row,
    Column,
    PageHeader,
    LButton,
    LTable,
    ModalViewDetails,
    LInput,
  },
})
export default class ViewSearch extends Vue {
  dataSet = exampleDataPeople;

  searchValue = "";
  rowInFocus: ITableRow | null = null;

  get searchableData() {
    return this.dataSet.map(item => {
      const pop = { ...item, renderKey: uuidv1() };
      return new SearchItem(pop);
    });
  }

  get filteredData() {
    const searchValue = this.searchValue.toLowerCase();

    return this.searchableData.filter(item =>
      item.searchTerm.includes(searchValue)
    );
  }

  onCloseModal() {
    this.rowInFocus = null;
  }

  onShowItemDetails(item: ITableRow) {
    this.rowInFocus = item;
  }
}
</script>
