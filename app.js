const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemsList");
const filters = document.querySelectorAll(".nav-item");
let todoItems = [];

const getItemsFilter=function(type){
    let filterItems=[]
    switch (type){
        case "todo":
            filterItems=todoItems.filter(item=>!item.isDone);
            break;
        case "done":
            filterItems=todoItems.filter(item=>item.isDone);
            break;
        default:
            filterItems=todoItems
    }
    getList(filterItems);
};
// handle item
const handleItem = function (itemData) {
  const items = document.querySelectorAll(".list-group-item");
  items.forEach((item) => {
    if (
      item.querySelector(".title").getAttribute("data-time") == itemData.addedAt
    ) {
      // done
      console.log(itemData,item)
      console.log(item.querySelector("[data-done]"))
      if (!itemData.isDone){
        console.log("hiiiii")
        item.querySelector("[data-done]").addEventListener("click", function (e) {
          console.log("click hi")
          e.preventDefault();
          const itemIndex=todoItems.indexOf(itemData)
          const currentItem=todoItems[itemIndex]
          currentItem.isDone=currentItem.isDone ?false:true;
          todoItems.splice(itemIndex,1,currentItem)
          setLocalStorage(todoItems)
        });
      }
      
      //delete
      if (itemData.isDone){
        console.log("byeee")
        item.querySelector("[data-delete]").addEventListener("click", function (e) {
          console.log("click bye")
          e.preventDefault();
          const itemIndex=todoItems.indexOf(itemData)
          const currentItem=todoItems[itemIndex]
          currentItem.isDone=false
          console.log(currentItem.isDone)
          todoItems.splice(itemIndex,1,currentItem)
          setLocalStorage(todoItems)
          });
      }
      
    }
    })
}
// get list items
const getList = function (todoItems) {
  itemList.innerHTML = "";
  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      let str=`<li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="title" data-time="${item.addedAt}">${item.name}</span> 
      <span> 
      `
      if (!item.isDone){
        str=str+`<a href="#" data-done><i class="bi bi-check-circle green"></i></a>`
      }else{
        str=str+` <a href="#" data-delete><i class="bi bi-x-circle red"></i></a>   `
      }
      str=str+`</li>`
      itemList.insertAdjacentHTML(
        "beforeend",
        str
      );
      handleItem(item);
      console.log("item is",item)
    });
  }
  
};

// get localstorage from the page
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoItems");
  if (todoStorage === "undefined" || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    //console.log("items", todoItems);
  }
  getList(todoItems);
};
// set list in local storage
const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

document.addEventListener("DOMContentLoaded", () => {
   // console.log("PPPPPPPPPPPPP")
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const itemName = itemInput.value.trim();
          const itemObj = {
            name: itemName,
            isDone: false,
            addedAt: new Date().getTime(),
          };
      todoItems.push(itemObj);
          // set local storage
      setLocalStorage(todoItems);
          
      getList(todoItems);
        // get list of all items
      console.log(todoItems);
    });
    filters.forEach((tab)=>{
        tab.addEventListener('click',function(e){
            e.preventDefault();
            const tabtype=this.getAttribute("data-type");
            //alert(tabtype)
            document.querySelectorAll(".nav-link").forEach((nav) => {
                nav.classList.remove("active");
              });
              this.firstElementChild.classList.add("active");
              document.querySelector("#filterType").value = tabtype;
            getItemsFilter(tabtype)
        })
    })

    getLocalStorage();
})
