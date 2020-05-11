import TableRow from "@/interfaces/TableRow";

interface State {
  dataSet: TableRow[];
}

export default {
  state: {
    dataSet: [],
  } as State,

  mutations: {
    setDataSet(state: State, dataSet: TableRow[]) {
      state.dataSet = dataSet;
    },

    setDataRow(state: State, newRow: TableRow) {
      const index = state.dataSet.findIndex(
        row => row.renderKey === newRow.renderKey
      );

      if (index < 0) {
        return;
      }

      state.dataSet.splice(index, 1, newRow);
    },
  },

  getters: {},
};
