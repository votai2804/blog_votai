QUnit.module('toggleProjects', function(hooks) {
  hooks.beforeEach(function() {
    // Create a mock DOM for the test
    const fixture = document.getElementById('qunit-fixture');
    fixture.innerHTML = `
      <div id="hiddenProjects"></div>
      <button id="viewAllBtn">Xem Tất Cả Dự Án</button>
    `;
  });

  QUnit.test('should toggle the "show" class on hiddenProjects', function(assert) {
    const hiddenProjects = document.getElementById('hiddenProjects');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    assert.notOk(hiddenProjects.classList.contains('show'), 'Initially hiddenProjects should not have "show" class');

    toggleProjects();
    assert.ok(hiddenProjects.classList.contains('show'), 'After first toggle, hiddenProjects should have "show" class');
    assert.equal(viewAllBtn.textContent, 'Ẩn Các Dự Án Khác', 'Button text should be "Ẩn Các Dự Án Khác"');
    assert.ok(viewAllBtn.classList.contains('active'), 'Button should have "active" class');


    toggleProjects();
    assert.notOk(hiddenProjects.classList.contains('show'), 'After second toggle, hiddenProjects should not have "show" class');
    assert.equal(viewAllBtn.textContent, 'Xem Tất Cả Dự Án', 'Button text should be "Xem Tất Cả Dự Án"');
    assert.notOk(viewAllBtn.classList.contains('active'), 'Button should not have "active" class');
  });
});

QUnit.module('Mobile Menu', function(hooks) {
  hooks.beforeEach(function() {
    // Create a mock DOM for the test
    const fixture = document.getElementById('qunit-fixture');
    fixture.innerHTML = `
      <div id="hamburger"></div>
      <ul id="navMenu">
        <li><a href="#" class="nav-link">Home</a></li>
      </ul>
    `;
    // Re-run the event listener setup
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
  });

  QUnit.test('should toggle active class on hamburger and navMenu when hamburger is clicked', function(assert) {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    assert.notOk(hamburger.classList.contains('active'), 'Initially hamburger should not have "active" class');
    assert.notOk(navMenu.classList.contains('active'), 'Initially navMenu should not have "active" class');

    hamburger.click();
    assert.ok(hamburger.classList.contains('active'), 'After click, hamburger should have "active" class');
    assert.ok(navMenu.classList.contains('active'), 'After click, navMenu should have "active" class');

    hamburger.click();
    assert.notOk(hamburger.classList.contains('active'), 'After second click, hamburger should not have "active" class');
    assert.notOk(navMenu.classList.contains('active'), 'After second click, navMenu should not have "active" class');
  });

  QUnit.test('should remove active class when a nav-link is clicked', function(assert) {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLink = document.querySelector('.nav-link');

    // first open the menu
    hamburger.click();
    assert.ok(hamburger.classList.contains('active'), 'hamburger should be active');
    assert.ok(navMenu.classList.contains('active'), 'navMenu should be active');

    // then click a link
    navLink.click();
    assert.notOk(hamburger.classList.contains('active'), 'After nav-link click, hamburger should not be active');
    assert.notOk(navMenu.classList.contains('active'), 'After nav-link click, navMenu should not be active');
  });
});