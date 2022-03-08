// Array
let myList = [];

// Press Enter on input (https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp)
let input = document.getElementById("item");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("click").click();
    }
});

// get text from input
function getText() {
    let x = document.getElementById("item");
    x = x.value;
    // when submit, pushes input to array myList
    myList.push({ name: x, done: false });

    saveItem();
    loadItem();
    showList();
}

//https://stackoverflow.com/questions/10179815/get-loop-counter-index-using-for-of-syntax-in-javascript
function showList() {
    let ol = document.getElementById("show")
    let h = '';
    if (myList && myList.length) {
        h = '<ol>\r\n';

        for (let i = 0; i < myList.length; i++) {
            let li = myList[i];
            h +=
                `<li class="text" style="color:${li.done ? "green" : "red"}; text-decoration: ${li.done ? "line-through" : "none"};"> <input class="todo-item" type="checkbox" id="don-btn" onclick="doneItem(${i})" ${li.done ? "checked" : ""}>`
                + li.name +
                `<span class="del-btn" onclick="delItem(${i})">&#9003</span>
            </li> `;
        }
        h += `</ol>`;
        ol.innerHTML = h;
    } else {
        ol.innerHTML = '';
    }
}
// delete button 
function delItem(index) {
    myList.splice(index, 1);
    alert("Are you sure you want to delete this?");

    saveItem();
    loadItem();
    showList();
}
// https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
// clears entire list
function clearAll(index) {
    while (myList.length > 0) {
        myList.pop();
    }
    console.log("clear all button");

    saveItem();
    loadItem();
    showList();

}
// mark list items as done
function doneItem(index) {
    let text = document.getElementsByClassName("text");
    let checkboxes = document.getElementsByClassName('todo-item')
    // https://www.designcise.com/web/tutorial/how-to-toggle-a-checkbox-using-javascript
    myList[index].done = checkboxes[index].checked

    // condition ? true : false
    text[index].style.color = checkboxes[index].checked ? "green" : "red";
    text[index].style.textDecoration = checkboxes[index].checked ? "line-through" : "none";
    // https://stackoverflow.com/questions/32906887/remove-all-falsy-values-from-an-array
    let d = document.getElementById("done-count").innerHTML = myList.filter(item => item.done).length
    saveItem();
}


function saveItem() {
    // const a = JSON.stringify(myList);
    // localStorage.setItem('TODO', a);
    //setData(DB_PATH + DEFAULT_TODO, myList);
    setData(user_path, myList)
}

var flag = false;

function loadItem() {
    // const a = localStorage.getItem('TODO');
    // let b = JSON.parse(a);
    // if (b == null) b = [];
    // myList = b;

    if (!flag) {
        flag = true;
        watcher = watchData(user_path, data => {
        //watchData(DB_PATH + DEFAULT_TODO, data => {
            if (data != null) {
                myList = data;
            }
            showList();
            //todo count
            let c = document.getElementById("todo-count").innerHTML = myList.length;
            //done count
            let d = document.getElementById("done-count").innerHTML = myList.filter(item => item.done).length
        });
    }
}

var user_path = "";
var watcher = null;

function setupUser(user) {
    if (user != null) {
        // setup new user
        user_path = DB_PATH + "users/" + user.uid + "/default";
        flag = false;
        loadItem();
    } else {
        // remove watcher, user and list
        if (watcher != null) {
            watcher.unsubscribe();
        }
        user_path = "";
        myList = [];
        showList();
    }
}


function onload() {
    loadItem();
    showList();
}

this.document.onload = onload();