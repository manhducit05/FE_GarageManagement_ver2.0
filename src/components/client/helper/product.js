export default function priceNewProducts(products) {
  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)

    console.log(item.priceNew)

    return item;
  })

  return newProducts
}