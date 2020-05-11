describe("Navigation", () => {
  const ROUTES_TO_NAVIGATE_TO = [
    { path: "dashboard", header: "Dashboard" },
    { path: "editor", header: "CSV Editor" },
    { path: "search", header: "Smart Search" },
  ];
  const PAGE_HEADER_SELECTOR = '[data-test="page-header__header"]';

  it.skip("Default Root Is Dashboard", () => {
    cy.visit("/");
    cy.get(PAGE_HEADER_SELECTOR).should("have.text", "Dashboard");
  });

  it("Can Navigate To Different Screens Using Sidebar", () => {
    cy.visit("/");

    ROUTES_TO_NAVIGATE_TO.forEach(route => {
      const tabLink = cy.get(`[data-test=sidebar-tab__${route.path}]`);
      tabLink.click();

      cy.get(PAGE_HEADER_SELECTOR).should("have.text", route.header);
    });
  });
});
