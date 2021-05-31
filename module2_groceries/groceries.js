// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var products = [
	{
		name: "brocoli",
		nonDairy: true,
		noNuts: true,
    organic:true,
		price: 2.99
	},
	{
		name: "bread",
		nonDairy: true,
		noNuts: true,
    organic:false,
		price: 2.35
	},
	{
		name: "salmon",
		nonDairy: true,
		noNuts: true,
    organic:false,
		price: 10.00
	},
  {
    name: "cookies",
    nonDairy: false,
    noNuts: false,
    organic:false,
    price: 1.99
  },
  {
    name: "peanut butter",
    nonDairy: true,
    noNuts: false,
    organic:true,
    price: 3.99
  },
  {
    name: "almond milk",
    nonDairy: true,
    noNuts: false,
    organic:false,
    price: 6.45
  },
  {
    name: "milk",
    nonDairy: false,
    noNuts: true,
    organic:true,
    price: 5.45
  },
  {
    name: "chocolate",
    nonDairy: false,
    noNuts: true,
    organic:false,
    price: 1.35
  },
  {
    name: "carrots",
    nonDairy: true,
    noNuts: true,
    organic:true,
    price: 2.99
  },
  {
    name: "watermelon",
    nonDairy: true,
    noNuts: true,
    organic:true,
    price: 7.80
  }

];



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
			prods[i].style.backgroundColor= "green";
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
