// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var products = [
	{
		name: "Broccoli - $2.99",
		nonDairy: true,
		noNuts: true,
    organic:true,
		price: 2.99
	},
	{
		name: "Bread - $2.35",
		nonDairy: true,
		noNuts: true,
    organic:false,
		price: 2.35
	},
	{
		name: "Salmon - $10.00",
		nonDairy: true,
		noNuts: true,
    organic:false,
		price: 10.00
	},
  {
    name: "Cookies - $1.99",
    nonDairy: false,
    noNuts: false,
    organic:false,
    price: 1.99
  },
  {
    name: "Peanut butter - $3.99",
    nonDairy: true,
    noNuts: false,
    organic:true,
    price: 3.99
  },
  {
    name: "Almond milk - $6.45",
    nonDairy: true,
    noNuts: false,
    organic:false,
    price: 6.45
  },
  {
    name: "Milk - $5.45",
    nonDairy: false,
    noNuts: true,
    organic:true,
    price: 5.45
  },
  {
    name: "Chocolate - $1.35",
    nonDairy: false,
    noNuts: true,
    organic:false,
    price: 1.35
  },
  {
    name: "Carrots - $2.99",
    nonDairy: true,
    noNuts: true,
    organic:true,
    price: 2.99
  },
  {
    name: "Watermelon - $7.80",
    nonDairy: true,
    noNuts: true,
    organic:true,
    price: 7.80
  }

];


products.sort((a,b)=>(a.price>b.price?1:-1));
// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "Lactose intolerant") && (prods[i].nonDairy == true)){
			product_names.push(prods[i].name);
		}
	  else if ((restriction == "Allergic to nuts") && (prods[i].noNuts == true)){
			product_names.push(prods[i].name);
		}
    else if ((restriction == "Organic") && (prods[i].organic == true)){
			product_names.push(prods[i].name);
		}
		else if (restriction == "None"){
			product_names.push(prods[i].name);
		}
	}
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
