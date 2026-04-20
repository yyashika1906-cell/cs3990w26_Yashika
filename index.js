//  data
let hannaDishes = [
  {
    dish: "Dinner Recipes",
    category: "Dinner",
    image: "./photos/image1.jpg",
    descr:
      "This lively picadillo cornbread casserole just hits the spot and is the perfect vehicle for all those flavors you love to combine in a savory, cheesy base under baked cornbread. Top with any combination of your favorite toppings on hand. We love this with a little salad of shredded lettuce and some pico de gallo",
  },
  {
    dish: "Tomato Soup and Grilled Cheese Casserole",
    category: "Dinner",
    image: "./photos/image2.jpg",
    descr:
      "This tomato soup and grilled cheese casserole tastes like the classic combo: Campbell's tomato soup meets golden, melty, and delicious.",
  },
  {
    dish: "Cream Cheese and Peanut Butter Strawberry Sandwich",
    category: "Sandwiches",
    image: "./photos/image3.jpeg",
    descr:
      "This cream cheese and peanut butter strawberry sandwich takes a classic combination—strawberries and peanut butter—to the next level.",
  },
];

// category class
class Category {
  constructor(category) {
    this.category = category;
  }

  // Creates and appends a button into #dishPanel using jQuery
  render() {
    const $btn = $("<div></div>")
      .addClass("category-btn")
      .attr("data-category", this.category)
      .text(this.category);

    // jQuery: select element and append
    $("#dishPanel").append($btn);
  }
}

// dish class
class Dish {
  constructor(dish, image, descr) {
    this.dish = dish;
    this.image = image;
    this.descr = descr;
  }

  // Returns a jQuery-built dish block
  render() {
    const $block = $("<div></div>").addClass("dish-block");
    const $title = $("<h2></h2>").text(this.dish);
    const $img   = $("<img>").attr("src", this.image).attr("alt", this.dish);
    const $p     = $("<p></p>").text(this.descr);

    $block.append($title).append($img).append($p);
    return $block;
  }
}

// Generate category buttons 
// Uses forEach() to loop through data and create unique Category instances
function generateCategories(dishes) {
  const seen = [];
  dishes.forEach(function (item) {
    if (!seen.includes(item.category)) {
      seen.push(item.category);
      const cat = new Category(item.category);
      cat.render();
    }
  });
}

// Event delegation (jQuery) on #dishPanel
// jQuery: select element, set click behaviour, change style
$("#dishPanel").on("click", ".category-btn", function () {
  const selectedCategory = $(this).attr("data-category");

  // jQuery: change style – remove/add active class for shadow highlight
  $(".category-btn").removeClass("active").css("box-shadow", "");
  $(this).addClass("active").css("box-shadow", "4px 4px 0px #2d6a2d");

  // jQuery: clear previous dish content
  $("#dishDesc").empty();

  // forEach to generate Dish instances for the matching category
  hannaDishes.forEach(function (item) {
    if (item.category === selectedCategory) {
      const dish = new Dish(item.dish, item.image, item.descr);
      // jQuery: append rendered dish block
      $("#dishDesc").append(dish.render());
    }
  });
});

// Init 
generateCategories(hannaDishes);
