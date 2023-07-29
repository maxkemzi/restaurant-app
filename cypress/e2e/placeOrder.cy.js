it("should place a new order", () => {
	cy.visit("http://localhost:3000");

	cy.contains("a", /get started/i).click();

	cy.url().should("include", "/products");

	cy.contains(/add to cart/i).click();

	cy.get("[data-testid='cart-button']").click();
	cy.contains(/view cart/i).click();

	cy.url().should("include", "/cart");

	cy.get("input[name='clientName']").type("Max");
	cy.get("input[name='clientPhone']").type("+380668053289");
	cy.get("input[name='clientAddress']").type("Ukraine");

	cy.contains(/place an order/i).click();

	cy.url().should("include", "/my-orders");

	cy.get("[data-testid^='order-table-row']").within(() => {
		cy.contains("td", "Max").should("be.visible");
		cy.contains("td", "+380668053289").should("be.visible");
		cy.contains("td", "Ukraine").should("be.visible");
	});
});
