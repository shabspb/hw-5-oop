// MenuItems

function MenuItem(type, stuffing) {
    this.type = type;
    this.stuffing = stuffing;
    this.name = type.name;
    this.weight = type.weight;
    this.price = type.price;
    this.calories = type.calories;
}

MenuItem.prototype.getType = function () {
    return this.type;
};

MenuItem.prototype.getStuffing = function () {
    return this.stuffing;
};

MenuItem.prototype.calculatePrice = function () {
    return this.type.price + this.stuffing.price;
};

MenuItem.prototype.calculateCalories = function () {
    return this.type.calories + this.stuffing.calories;
};

// Hamburgers

function Hamburger(type) {
    MenuItem.apply(this, arguments);
    this.name = this.type.name + ' with ' + this.stuffing.name;
    this.price = this.type.price + this.stuffing.price;
    this.calories = this.type.calories + this.stuffing.calories;
}

Hamburger.prototype = Object.create(MenuItem.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.SIZE_SMALL = {
    name: 'Small hamburger',
    price: 50,
    calories: 20
};

Hamburger.SIZE_LARGE = {
    name: 'Large hamburger',
    price: 100,
    calories: 40
};

Hamburger.STUFFING_CHEESE = {
    name: 'cheese',
    price: 10,
    calories: 20
};

Hamburger.STUFFING_SALAD = {
    name: 'salad',
    price: 20,
    calories: 5
};

Hamburger.STUFFING_POTATO = {
    name: 'potato',
    price: 15,
    calories: 10
};

// Salads

function Salad(type, weight) {
    MenuItem.call(this, type);
    this.price = (type.price * weight) / 100;
    this.weight = weight;
}

Salad.prototype = Object.create(MenuItem.prototype);
Salad.prototype.constructor = Salad;

Salad.CAESAR = {
    name: 'Caesar',
    price: 100,
    calories: 20
};
Salad.OLIVIE = {
    name: 'Olivie',
    price: 50,
    calories: 80
};

Salad.prototype.calculatePrice = function () {
    return (this.type.price * this.weight) / 100;
};

Salad.prototype.calculateCalories = function () {
    return (this.type.calories * this.weight) / 100;
};

// Drinks
function Drink(type) {
    MenuItem.apply(this, arguments);
}

Drink.prototype = Object.create(MenuItem.prototype);
Drink.prototype.constructor = Drink;

Drink.COLA = {
    name: 'Cola',
    price: 50,
    calories: 40
};
Drink.COFFEE = {
    name: 'Coffee',
    price: 80,
    calories: 20
};

Drink.prototype.calculatePrice = function () {
    return this.type.price;
};

Drink.prototype.calculateCalories = function () {
    return this.type.calories;
};

// Order

function Order() {
    this.order = Array.prototype.slice.call(arguments, 0);
    this.isPaid = false;
}

Order.prototype.getPay = function () {
    this.isPaid = true;
    Object.freeze(this);
    console.log('Order has been paid. Thank you!');
};

Order.prototype.addItem = function (item) {
    if (this.isPaid) {
        console.log('Your order has already been paid. Please, place a new order.');
    } else {
        this.order.push(item);
        console.log(item.name + ' added in your order!');

    }
};

Order.prototype.deleteItem = function (item) {
    if (this.isPaid) {
        console.log('Your order has already been paid. Please, place a new order.');
    } else {
        if (this.order.indexOf(item) !== -1) {
            this.order.splice(this.order.indexOf(item), 1);
            console.log(item.name + ' removed from your order!');
        } else {
            console.log('Your order is empty. Please, add position.');
        }
    }
};

Order.prototype.calculateTotalPrice = function () {
    var totalPrice = 0;
    if (this.order.length) {
        this.order.forEach(function (item) {
            totalPrice += item.calculatePrice();
        });
    } else {
        console.log('Your order is empty. Please, add position.');

    }
    console.log('Total price: ' + totalPrice + ' tugrics');
    return totalPrice;
};

Order.prototype.calculateTotalCalories = function () {
    var totalCalories = 0;
    if (this.order.length) {
        this.order.forEach(function (item) {
            totalCalories += item.calculateCalories();
        });
    } else {
        console.log('Your order is empty. Please, add position.');

    }
    console.log('Total calories: ' + totalCalories + ' calories');
    return totalCalories;
};

Order.prototype.getOrder = function () {
    var wholeOrder = '';
    var generalTextOrder = 'Your order is:';
    this.order.forEach(function (item) {
        wholeOrder += '\n' + item.name + ' : ' + item.price + ' tug' + ' / ' + item.calories + ' cal;';
    });
    var showOrder = generalTextOrder + wholeOrder + ' \nTotal: ' + this.calculateTotalPrice() + ' tug / ' + this.calculateTotalCalories() + ' cal;';
    return console.log(showOrder);
};

// Test

var hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
var hamburger_1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
var hamburger_2 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
var caesar = new Salad(Salad.CAESAR, 150);
var cola = new Drink(Drink.COLA);

var order = new Order(hamburger, caesar, cola);
var order_1 = new Order();
var order_2 = new Order(hamburger_2, caesar, cola);
var order_3 = new Order(hamburger, hamburger_1, caesar, cola);

order.getOrder();
order.addItem(hamburger_1);
order.getOrder();
order.deleteItem(hamburger);
order.getOrder();
order.calculateTotalPrice();
order.calculateTotalCalories();
order.getPay();
order.addItem(hamburger);
order.deleteItem(hamburger_1);

order_1.getOrder();
order_1.deleteItem(hamburger);
order_1.addItem(hamburger);
order_1.addItem(caesar);
order_1.addItem(cola);
order_1.getOrder();