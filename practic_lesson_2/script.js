function getCounter() {
	let last = 0;

	return () => ++last;
}
const showCaseDivEl = document.querySelector('.featuredItems');
const basketTotalDivEl = document.querySelector('.basketTotal');
const basketTotalValueSpanEl = document.querySelector('.basketTotalValue');
const basketTotalPriceSpanEl = document.querySelector('.basketTotalPrice');
const basketEl = document.querySelector('.basket');
const stackIDGenrator = getCounter();

document.querySelector('.cart-button').addEventListener('click', event => {
	if (event.target.closest('.cart-button')) {
		basketEl.classList.toggle('hidden');
	}
});


class Good {
	constructor({ id, title, price }) {
		this.id = id;
		this.title = title;
		this.price = price;
	}

	getId() {
		return this.id;
	}

	getPrice() {
		return this.price;
	}

	getTitle() {
		return this.title;
	}
}

class GoodStack {
	constructor(good) {
		this.id = stackIDGenrator();
		this.good = good;
		this.count = 1;
	}

	getGoodId() {
		return this.good.id;
	}

	getGood() {
		return this.good;
	}

	getCount() {
		return this.count;
	}

	add() {
		this.count++;
		return this.count;
	}

	remove() {
		this.count--;
		return this.count;
	}
}

class Cart {
	constructor() {
		this.list = []
	}

	add(good) {
		const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id);

		if (idx >= 0) {
			this.list[idx].add();
		} else {
			this.list.push(new GoodStack(good));
		}
	}

	remove(id) {
		const idx = this.list.findIndex((stack) => stack.getGoodId() == id);

		if (idx >= 0) {
			this.list[idx].remove();

			if (this.list[idx].getCount() <= 0) {
				this.list.splice(idx, 1);
			}
		}
	}
}

class RenderCart {
	constructor(cart) {
		this.cart = cart;
	}
	renderCartEls() {

		const basketRowGoogEls = document.querySelectorAll('.basketRowGoog');
		if (basketRowGoogEls) {
			basketRowGoogEls.forEach(el => el.remove());
			basketTotalValueSpanEl.textContent = '0';
			basketTotalPriceSpanEl.textContent = '';
		}

		this.cart.list.forEach((el, idx) => {
			basketTotalDivEl.insertAdjacentHTML('beforebegin',
				`
			<div class="basketRow basketRowGoog" data-productId="${el.good.id}">
				<div>${el.good.title}</div>
				<div><button class="changeCountGood reduceCount" data-productId="${el.good.id}">-</button>
					<span class="productCount">${el.count}</span> шт.
					<button class="changeCountGood increaseCount" data-productId="${el.good.id}">+</button>
				</div>
				<div>$${el.good.price}</div>
				<div>
					<span class="productTotalRow">
					$${(el.count * el.good.price).toFixed(2)}
					</span>
				</div>
			</div>
			`);
			basketTotalValueSpanEl.textContent = this.getTotalBasketValue();
			basketTotalPriceSpanEl.textContent = this.getTotalBasketPrice();
		});
	}

	getTotalBasketValue() {
		return this.cart.list.reduce((acc, good) => acc + good.count, 0);
	}

	getTotalBasketPrice() {
		return this.cart.list
			.reduce((acc, good) => acc + good.count * good.good.price, 0);
	}
}

class Showcase {
	constructor(cart) {
		this.list = [];
		this.cart = cart;
	}

	fetchGoods() {
		this.list = [
			new Good({ id: 1, title: 'Футболка', price: 140 }),
			new Good({ id: 2, title: 'Брюки', price: 320 }),
			new Good({ id: 3, title: 'Галстук', price: 24 }),
		]
	}

	addToCart(id) {
		const idx = this.list.findIndex((good) => id == good.id);

		if (idx >= 0) {
			this.cart.add(this.list[idx]);
		}
	}
}

class RenderShowcase {
	constructor({ cart, list }) {
		this.cart = cart;
		this.list = list;
	}
	renderShowCaseEl() {
		this.list.forEach(el => {
			showCaseDivEl.insertAdjacentHTML('afterbegin',
				`<div class="featuredItem" data-id="${el.id}" 
				data-name="${el.title}" data-price="${el.price}">
				<div class="featuredImgWrap">
				<img src="1.jpg" alt="">
					<div class="featuredImgDark">
						<button class="addToCart">
							<img src="cart.svg" alt="">
							Add to Cart
						</button>
					</div>
				</div>
				<div class="featuredData">
					<div class="featuredName">
						${el.title}
					</div>
					<div class="featuredText">
						Known for her sculptural takes on traditional tailoring,
						Australian arbiter of cool Kym Ellery
						teams
						up with Moda Operandi.
					</div>
					<div class="featuredPrice">
					$${el.price}
					</div>
				</div>
			</div>`
			);
		});
	}
}
showCaseDivEl.addEventListener('click', event => {
	if (!event.target.closest('.addToCart')) {
		return;
	}
	const id = +event.target.closest('.featuredItem').dataset.id;

	showcase.addToCart(id);
	renderCart.renderCartEls();
});

basketEl.addEventListener('click', event => {
	if (!event.target.closest('.changeCountGood')) {
		return;
	}
	const goodId = +event.target.dataset.productid;
	event.target.classList.contains('reduceCount')
		? cart.remove(goodId) : showcase.addToCart(goodId);
	renderCart.renderCartEls();
});

const cart = new Cart();
const showcase = new Showcase(cart);
const renderCart = new RenderCart(cart);

showcase.fetchGoods();
const renderShowcase = new RenderShowcase(showcase);

renderShowcase.renderShowCaseEl();
renderCart.renderCartEls();
