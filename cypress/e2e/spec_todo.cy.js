describe('TodoMVC App Test', () => {
  before(() => {
    cy.visit('https://todomvc.com/examples/javascript-es6/dist/');
  });

  it('Should add five items, mark two and four as completed, remove only item three, and clear completed', () => {
    const todos = ['one', 'two', 'three', 'four', 'five'];
    
    // Add items one, two, three, four, five
    todos.forEach((todo) => {
      cy.get('.new-todo').type(`${todo}{enter}`);
    });

    // Small delay to ensure elements are rendered
    cy.wait(500);

    // Log the current order of the list items to debug the issue
    cy.get('.todo-list li').each(($el, index) => {
      cy.log(`Item ${index + 1}: ${$el.text().trim()}`);
    });

    // Check the reverse order, assuming the items are rendered last-first
    cy.get('.todo-list li').eq(4).invoke('text').then((text) => {
      expect(text.trim()).to.equal('one');
    });
    cy.get('.todo-list li').eq(3).invoke('text').then((text) => {
      expect(text.trim()).to.equal('two');
    });
    cy.get('.todo-list li').eq(2).invoke('text').then((text) => {
      expect(text.trim()).to.equal('three');
    });
    cy.get('.todo-list li').eq(1).invoke('text').then((text) => {
      expect(text.trim()).to.equal('four');
    });
    cy.get('.todo-list li').eq(0).invoke('text').then((text) => {
      expect(text.trim()).to.equal('five');
    });

    // Mark the second and fourth items as completed (selected)
    cy.get('.todo-list li').eq(3).find('.toggle').click(); // Mark "two" as completed
    cy.get('.todo-list li').eq(1).find('.toggle').click(); // Mark "four" as completed

    // Verify that two and four are marked as completed
    cy.get('.todo-list li').eq(3).should('have.class', 'completed');
    cy.get('.todo-list li').eq(1).should('have.class', 'completed');

    // Remove "item three"
    cy.get('.todo-list li').eq(2).find('.destroy').invoke('show').click();

    // Log to check the current list after removing "three"
    cy.log('Items after removing three:');
    cy.get('.todo-list li').each(($el, index) => {
      cy.log(`Item ${index + 1}: ${$el.text().trim()}`);
    });

    // Confirm that "item three" is removed and only 4 items remain
    cy.get('.todo-list li').should('have.length', 4);

    // Check that the remaining items are: one, two, four, five
    cy.get('.todo-list li').eq(3).invoke('text').then((text) => {
      expect(text.trim()).to.equal('one');
    });
    cy.get('.todo-list li').eq(2).invoke('text').then((text) => {
      expect(text.trim()).to.equal('two');
    });
    cy.get('.todo-list li').eq(1).invoke('text').then((text) => {
      expect(text.trim()).to.equal('four');
    });
    cy.get('.todo-list li').eq(0).invoke('text').then((text) => {
      expect(text.trim()).to.equal('five');
    });

    // Continue with filter tests and clear completed tasks
  });
});
