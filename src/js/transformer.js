const lazyloadInstance = require('./common/LazyLoad')(),
      { setDefaults } = require('./common')



document.addEventListener('DOMContentLoaded', () => {

setDefaults();

let accordion = document.querySelector('.answers');
let items = accordion.querySelectorAll('.answers__item');
let title = accordion.querySelectorAll('.answers__title');

function toggleAccordion() {
  items.forEach(item => {
    let thisItem = this.parentNode;
    if (thisItem === item ) {
      thisItem.classList.toggle('active');
      return;
    }
    item.classList.remove('active');
    
  });
  
}

title.forEach(question => question.addEventListener('click', toggleAccordion));

const tab = document.querySelector('.step__tabs');
const list = document.querySelector('.step__content');


class TabList {
  constructor(tab, list) {
    this.tab = tab;
    this.list = list;
    
    this.tab.addEventListener('click', event => {
      for (let sibling of event.target.parentNode.children) {
        sibling.classList.remove('active');
      }
      event.target.closest('.step__tab').classList.add('active');
      const index = event.target.closest('.step__tab').dataset.value;
      
      this.openTab(index);
    });
  }
  
  openTab(index) {
    this.list.querySelector('.active').classList.remove('active');
    this.list.querySelector(`.step__list--${index}`).classList.add('active');
  }
}

new TabList(tab, list);

	
  

});