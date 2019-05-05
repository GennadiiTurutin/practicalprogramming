import * as R from 'ramda';

export const getProductById = (state, id) => R.prop(id, state.products)

export const getActiveSlug = ownProps => R.path(['match', 'params', 'slug'], ownProps)

export const getProductBySlug = (state, ownProps) => {

	const hasActiveSlug = R.propEq('slug', getActiveSlug(ownProps));

	const product = Object.values(R.filter(hasActiveSlug, state.products))[0];
	
	return product
}

export const getActiveCategoryId = ownProps => R.path(['match', 'params', 'id'], ownProps)

export const getProducts = (state, ownProps) => {

	const activeCategoryId = getActiveCategoryId(ownProps)

	const activeCategoryUrl = (activeCategoryId === undefined) ? undefined : "http://127.0.0.1:8000/categories/" + activeCategoryId + "/";
	
	const applyCategory = item => R.equals(
		activeCategoryUrl,
		R.prop('category', item)
	)

	const applySearch = item => R.contains(
		state.productsPage.search,
		R.prop('title', item)
	)
	
	const products = R.compose(
		R.filter(applySearch),
		R.when(R.always(activeCategoryUrl), R.filter(applyCategory)),
		R.map(id => getProductById(state, id))
		)(state.productsPage.ids)
	return products
}

export const getTotalBasketCount = state => R.length(state.basket)

export const getTotalBasketPrice = state => {
	const totalPrice = R.compose(
		R.sum,
		R.pluck('price'),
		R.map(id => getProductById(state, id))
	    )(state.basket)
	return totalPrice
}

export const getCategories = state => R.values(state.categories)

export const getBasketProductsWithCount = state => {
	const uniqueIds = R.uniq(state.basket)
	const productCount = id => R.compose(
		R.length,
		R.filter(basketId => R.equals(id, basketId))
	    )(state.basket)
	const productWithCount = product => R.assoc('count', productCount(product.id), product)
	const products = R.compose(
		R.map(productWithCount),
		R.map(id => getProductById(state, id))
	    )(uniqueIds)
	return products
}