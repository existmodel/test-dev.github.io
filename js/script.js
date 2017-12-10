$(function () {
  // $("body").fadeOut();
});


 $(document).ready(function() {
        $(".js-popup").magnificPopup({type:"inline", midClick: true});

        $(".specials__item").each(function (i) {
          $(this).find("a").attr("href","#recipe_" + i);
          $(this).find(".recipe").attr("id", "recipe_" + i);
        });

        // function slowScroll(id) {
        //   var offset = 0;
        //   $("html, body").animate ({
        //     scrollTop: $(id).offset ().top - offset
        //   }, 1000);
        //   return false;
        // }
      });


var openFirstList = document.querySelector(".js-open-firstList");
var openSecondList = document.querySelector(".js-open-secondList");
var openThirdList = document.querySelector(".js-open-thirdList");
var openFourthList = document.querySelector(".js-open-fourthList");

var menuCategoryOne = document.querySelector(".menu__category-one");
var menuCategoryTwo = document.querySelector(".menu__category-two");
var menuCategoryThree = document.querySelector(".menu__category-three");
var menuCategoryFour = document.querySelector(".menu__category-four");


if (openFirstList) {
  openFirstList.addEventListener("click", function (event) {
    event.preventDefault();
    menuCategoryOne.classList.remove("js-hide");
    menuCategoryTwo.classList.add("js-hide");
    menuCategoryThree.classList.add("js-hide");
    menuCategoryFour.classList.add("js-hide");
    openSecondList.classList.remove("js-active-btn");
    openThirdList.classList.remove("js-active-btn");
    openFourthList.classList.remove("js-active-btn");
    openFirstList.classList.add("js-active-btn");
  });
}

if (openSecondList) {
  openSecondList.addEventListener("click", function (event) {
    event.preventDefault();
    menuCategoryOne.classList.add("js-hide");
    menuCategoryTwo.classList.remove("js-hide");
    menuCategoryThree.classList.add("js-hide");
    menuCategoryFour.classList.add("js-hide");
    openFirstList.classList.remove("js-active-btn");
    openThirdList.classList.remove("js-active-btn");
    openFourthList.classList.remove("js-active-btn");
    openSecondList.classList.add("js-active-btn");
  });
}

if (openThirdList) {
  openThirdList.addEventListener("click", function (event) {
    event.preventDefault();
    menuCategoryOne.classList.add("js-hide");
    menuCategoryTwo.classList.add("js-hide");
    menuCategoryThree.classList.remove("js-hide");
    menuCategoryFour.classList.add("js-hide");
    openFirstList.classList.remove("js-active-btn");
    openSecondList.classList.remove("js-active-btn");
    openFourthList.classList.remove("js-active-btn");
    openThirdList.classList.add("js-active-btn"); 
  });
}

if (openFourthList) {
  openFourthList.addEventListener("click", function (event) {
    event.preventDefault();
    menuCategoryOne.classList.add("js-hide");
    menuCategoryTwo.classList.add("js-hide");
    menuCategoryThree.classList.add("js-hide");
    menuCategoryFour.classList.remove("js-hide");
    openFirstList.classList.remove("js-active-btn");
    openSecondList.classList.remove("js-active-btn");
    openFourthList.classList.add("js-active-btn");
    openThirdList.classList.remove("js-active-btn"); 
  });
}

