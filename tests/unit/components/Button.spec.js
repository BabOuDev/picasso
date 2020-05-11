import { shallowMount } from "@vue/test-utils";
import Button from "@/components/button/Button.vue";

describe("Button.vue", () => {
  it("renders button text", () => {
    const buttonText = "button text";

    const wrapper = shallowMount(Button, {
      slots: {
        default: buttonText,
      },
    });

    expect(wrapper.text()).toMatch(buttonText);
  });

  it("is type primary > renders as primary button", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: "primary",
      },
    });

    expect(wrapper.classes()).toContain("primary");
    expect(wrapper.classes()).not.toContain("secondary");
  });

  it("is type secondary > renders as secondary button", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: "secondary",
      },
    });

    expect(wrapper.classes()).not.toContain("primary");
    expect(wrapper.classes()).toContain("secondary");
  });

  it("is disabled > renders as disabled button", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        isDisabled: true,
      },
    });

    expect(wrapper.classes()).toContain("disabled");
    expect(wrapper.attributes("disabled")).toBe("disabled");
  });

  it("is NOT disabled > do not render as disabled button", () => {
    const wrapper = shallowMount(Button);

    expect(wrapper.classes()).not.toContain("disabled");
    expect(wrapper.attributes("disabled")).not.toBe("disabled");
  });
});
