//select all elements
const clear=document.querySelector(".clear");
const date=document.getElementById("date");
const list=document.getElementById('list');
const input=document.getElementById('input');
const plus = document.getElementById('plus');
console.log(plus);


//declare classes names

const CHECK= "fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//localStorage.clear();
clear.addEventListener('click', function(){
	localStorage.clear();
	location.reload();
});
//show todays date
const today = new Date();
const options= {weekday:"long", month:"short", day:"numeric", year:"2-digit"};
date.innerHTML=today.toLocaleDateString("en-US", options);


//add a todo to list of todos
function addTodo(todo, id, done, trash)
{
	if(trash) return;
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH: "";
	const position="beforeend";

	const elem=
				`
				<li class="item">
					<i class="fa ${DONE} co" id=${id} job="complete"></i>
					<p class="text ${LINE}">${todo}</p>
					<i class="fa fa-trash-o de" id=${id} job="delete"></i>
				</li>
				`;
	list.insertAdjacentHTML(position,elem);
}


//add an item using the enter key
input.addEventListener('keyup', function(event){
	if(event.keyCode===13)  //code for the enter key
	{
		const todo = input.value;
		if(todo)
		{
			done=false; trash =false;   // some params (esp. default ones) defined just before calling the func
			addTodo(todo,id,false, false);
			LIST.push({name:todo, id: id, done:false, trash:false});
			localStorage.setItem("TODO", JSON.stringify(LIST)); //stringify converts a js obj to a js notation
			id++;
			input.value="";
		}

	}
});

plus.addEventListener('click', function(){
	const todo = input.value;
	if(todo)
	{
		done=false; trash =false;   // some params (esp. default ones) defined just before calling the func
		addTodo(todo,id,false, false);
		LIST.push({name:todo, id: id, done:false, trash:false});
		localStorage.setItem("TODO", JSON.stringify(LIST)); //stringify converts a js obj to a js notation
		id++;
		input.value="";
	}
})
list.addEventListener("click", function(e){
	const element = e.target;
	console.log(element);
	const jobAction = element.attributes.job.value;  // complete or delete
	//console.log("elem "+jobAction);

	if(jobAction=="complete")
		completeTodo(element);
	else if (jobAction=="delete")
		removeTodo(element);
}); 


//complete a todo
function completeTodo(element)
{
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
	LIST[element.id].done= LIST[element.id].done ? false : true;
	//.log("elem2 ");

}



//remove a todo item
function removeTodo(element)
{
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash=true;
}

//target the items created dynamically to remove or tick as done

//get item from localstorage
let data =localStorage.getItem("TODO");  // we use local storage in rirder to reload the todo items back to the  scren when the page is re;paded

//if the user added to do items, load them back after page is refreshed
if(data)
{
	LIST =JSON.parse(data);
	id = LIST.length;
	loadList(LIST); //load the data onto the user interface
}
else{
	LIST =[];

	id=0;
}


//func TO load data back ont he screen
function loadList(array) {
	array.forEach(function(item){
		addTodo(item.name, item.id, item.done, item.trash);
	});
}
