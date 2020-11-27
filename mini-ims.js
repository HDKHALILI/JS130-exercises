// 1. Item Creator
// 2. Items Manager
// 3. Reports Manager

const ItemCreator = (function() {

  function containSpace(string) {
    return string.includes(" ");
  }

  function isValidName(name) {
    if (containSpace(name)) {
      return name.replace(" ", '').length >= 5;
    } else {
      return name.length >= 5;
    }
  }

  function isValidCategory(category) {
    return category.length >= 5 && !containSpace(category);
  }

  function isValidQuantity(quantity) {
    return quantity !== undefined;
  }

  function generateSKUCode(name, category) {
    let skuCode = "";
    skuCode += name.replace(/\s/g, '').slice(0, 3);
    skuCode += category.slice(0, 2);

    return skuCode.toUpperCase();
  }

  return function(name, category, quantity) {
    if (isValidName(name) && isValidCategory(category) && isValidQuantity(quantity)) {
      this.sku = generateSKUCode(name, category);
      this.name = name;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  }
})();

const ItemManager = {
  items: [],

  create(name, category, quantity) {
    const item = new ItemCreator(name, category, quantity);

    if (item.hasOwnProperty('notValid')) {
      return false;
    } else {
      this.items.push(item);
    }
  },

  list() {
    return this.items;
  },

  getItem(skuCode) {
    return this.items.find(item => item.sku === skuCode);
  },

  update(skuCode, updateInformation) {
    Object.assign(this.getItem(skuCode), updateInformation);
  },

  delete(skuCode) {
    this.items = this.items.filter(item => item.skuCode !== skuCode);
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
    
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
}

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  createReporter(skuCode) {
    return (() => {
      const item = this.items.list().find((item) => item.sku === skuCode);
      return {
        itemInfo() {
          Object.keys(item).forEach(key => {
            console.log(`${key}: ${item[key]}`);
          })
        }
      }
    })();
  },

  reportInStock() {
    console.log(this.items.inStock().map(item => item.name).join(', '));
  }
}

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
// returns list with the 4 valid items
ItemManager.items;

ReportManager.init(ItemManager);

// logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
ItemManager.inStock();
// football,kitchen pot
ReportManager.reportInStock();

// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.itemsInCategory('sports');

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (soccer ball is removed from the list)
ItemManager.items;

console.log('-------------');

let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

console.log('-------------');

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10