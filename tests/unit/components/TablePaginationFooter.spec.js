import { shallowMount, mount } from "@vue/test-utils";
import TablePaginationFooter from "@/components/table/partials/TablePaginationFooter.vue";

describe("TablePaginationFooter.vue", () => {
  it("page does contain max number of items > renders correct message", () => {
    const wrapper = shallowMount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 0,
        numberOfItemsPerPage: 20,
        numberOfPages: 4,
        totalNumberOfItems: 80,
      },
    });

    const messageElement = wrapper.find(
      "[data-test=table-pagination-footer__message]"
    );

    // remove white space for comparison
    const actualMessage = messageElement.text().replace(/\s/g, "");
    const expectedMessage = "Showing1to20of80results";

    expect(actualMessage).toBe(expectedMessage);
  });

  it("page does NOT contain max number of items > renders correct message", () => {
    const wrapper = shallowMount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 2,
        numberOfItemsPerPage: 23,
        numberOfPages: 3,
        totalNumberOfItems: 68,
      },
    });

    const messageElement = wrapper.find(
      "[data-test=table-pagination-footer__message]"
    );

    // remove white space for comparison
    const actualMessage = messageElement.text().replace(/\s/g, "");
    const expectedMessage = "Showing47to68of68results";

    expect(actualMessage).toBe(expectedMessage);
  });

  it("if single page > do NOT render pagination buttons", () => {
    const wrapper = shallowMount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 0,
        numberOfItemsPerPage: 10,
        numberOfPages: 1,
        totalNumberOfItems: 10,
      },
    });

    const buttonsWrapper = wrapper.find(
      "[data-test=table-pagination-footer__buttons]"
    );

    expect(buttonsWrapper.exists()).toBeFalsy();
  });

  it("if more than one page > render pagination buttons", () => {
    const wrapper = shallowMount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 0,
        numberOfItemsPerPage: 10,
        numberOfPages: 2,
        totalNumberOfItems: 20,
      },
    });

    const buttonsWrapper = wrapper.find(
      "[data-test=table-pagination-footer__buttons]"
    );

    expect(buttonsWrapper.exists()).toBeTruthy();
  });

  it("on first page > can NOT navigate to previous page", () => {
    const wrapper = mount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 0,
        numberOfItemsPerPage: 10,
        numberOfPages: 2,
        totalNumberOfItems: 30,
      },
    });

    const prevBtnElement = wrapper.find(
      "[data-test=table-pagination-footer__prev-button]"
    );

    expect(prevBtnElement.classes()).toContain("disabled");
    prevBtnElement.trigger("click");
    expect(wrapper.emitted().onPrevPage).toBeFalsy();
  });

  it("on last page > can NOT navigate to next page", () => {
    const wrapper = mount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 2,
        numberOfItemsPerPage: 10,
        numberOfPages: 2,
        totalNumberOfItems: 30,
      },
    });

    const nextBtnElement = wrapper.find(
      "[data-test=table-pagination-footer__next-button]"
    );

    expect(nextBtnElement.classes()).toContain("disabled");
    nextBtnElement.trigger("click");
    expect(wrapper.emitted().onNextPage).toBeFalsy();
  });

  it("NOT on last page > can navigate to next page", () => {
    const wrapper = mount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 0,
        numberOfItemsPerPage: 10,
        numberOfPages: 2,
        totalNumberOfItems: 30,
      },
    });

    const nextBtnElement = wrapper.find(
      "[data-test=table-pagination-footer__next-button]"
    );

    expect(nextBtnElement.classes()).not.toContain("disabled");
    nextBtnElement.trigger("click");
    expect(wrapper.emitted().onNextPage).toBeTruthy();
  });

  it("NOT on first page > can navigate to previous page", () => {
    const wrapper = mount(TablePaginationFooter, {
      propsData: {
        currentPageIndex: 1,
        numberOfItemsPerPage: 10,
        numberOfPages: 2,
        totalNumberOfItems: 30,
      },
    });

    const prevBtnElement = wrapper.find(
      "[data-test=table-pagination-footer__prev-button]"
    );

    expect(prevBtnElement.classes()).not.toContain("disabled");
    prevBtnElement.trigger("click");
    expect(wrapper.emitted().onPrevPage).toBeTruthy();
  });
});
