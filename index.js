var ques_enter=document.getElementById("ques_enter");
var ques_show=document.getElementById("ques_show");
var ques_sub=document.getElementById("ques_sub");
var ques_type=document.getElementById("ques_type");
var ques_sub_btn=document.getElementById("ques_sub_btn");
var div_ques_show=document.getElementById("div_ques_show");
var ques_show_right=document.getElementById("ques_show_right");
var resp_btn=document.getElementById("resp_btn");
var resp_show_area=document.getElementById("resp_show_area");
var resolve_btn=document.getElementById("resolve_btn");
var new_ques_form_btn=document.getElementById("new_ques_form_btn");
var ques_serch=document.getElementById("ques_serch");
var ido;

let stored_todo = localStorage.getItem("todos");

var i=0;
var arr=stored_todo || [];

if(stored_todo)
{
  arr = JSON.parse(stored_todo);//array into object
}


ques_serch.addEventListener("keyup",function(){
  div_ques_show.innerHTML="";
  arr.forEach(function(e)
{
  var sub=e.type;
  var ques=e.ques;
   add_in_left(sub,ques)
});
  var value=ques_serch.value;
  if(value)
  { div_ques_show.innerHTML="";
  var count=0;
    arr.filter(function(e)
      {
        console.log(value);
         var sub=e.type;
         var ques=e.ques;
         if(sub.includes(value)||ques.includes(value))
          {
            count++;
            add_in_left(sub,ques)
          }
          
      });
      if(count===0)
      add_in_left("No MatchFound","");
  }

});

arr.forEach(function(e)
{
  var sub=e.type;
  var ques=e.ques;
   add_in_left(sub,ques)
});


ques_sub_btn.addEventListener("click",function(){
    var sub=ques_sub.value;
    ques_sub.value="";
    var ques=ques_type.value;
    ques_type.value="";

    arr.push({type:sub,ques:ques,arr1:[]});
 
    localStorage.setItem("todos", JSON.stringify(arr) );
 
    console.log(arr);
 
    add_in_left(sub,ques);

});


function add_in_left(sub,ques)
{
  var div_heading=document.createElement("h2");
  div_heading.innerText=sub;
  var div_ques=document.createElement("h5");
  div_ques.innerText=ques;
  var hr=document.createElement("hr");
  var div=document.createElement("div");
  div.setAttribute("id",i);
  div_heading.setAttribute("id",i);
  div_ques.setAttribute("id",i);
  i++;
  div.appendChild(div_heading);
  div.appendChild(div_ques);
  div.appendChild(hr);
  div_ques_show.appendChild(div);

}


div_ques_show.addEventListener("click",function(event){
  ques_enter.style.display="none";
  ques_show.style.display="block";
  ques_show_right.innerText="";
   ido=parseInt(event.target.id);
  var div_heading=document.createElement("h2");
  div_heading.innerText=arr[ido].type;
  var div_ques=document.createElement("h5");
  div_ques.innerText=arr[ido].ques;
  var hr=document.createElement("hr");
  var div=document.createElement("div");
  div.appendChild(div_heading);
  div.appendChild(div_ques);
  div.appendChild(hr);
  ques_show_right.appendChild(div);
  
  resp_show_area.innerHTML="";

  if(arr[ido].arr1)
  arr[ido].arr1.forEach(function(e){
  response_area(e.name,e.comment);
  });

});

resp_btn.addEventListener("click",function(){
 
  var righter_name=document.getElementById("name");
  var righter_area=document.getElementById("area");
  

 var name=righter_name.value;
  righter_name.value="";
  var comment=righter_area.value;
  righter_area.value="";
  
  response_area(name,comment);

  console.log(ido)
   
  arr[ido].arr1.push({name:name,comment:comment});
  localStorage.setItem("todos", JSON.stringify(arr) );
   

  
});

function response_area(name,comment)
{

  var div_heading=document.createElement("h3");
  div_heading.innerText=name;
  var div_ques=document.createElement("h5");
  div_ques.innerText=comment;
  var hr=document.createElement("hr");
  var div=document.createElement("div");
  div.appendChild(div_heading);
  div.appendChild(div_ques);
  div.appendChild(hr);
  resp_show_area.appendChild(div); 

}
resolve_btn.addEventListener("click",function(){
  resp_show_area.innerHTML="";
  ques_enter.style.display="block";
  ques_show.style.display="none";

   var v=document.getElementById(ido);
  div_ques_show.removeChild(v);

  arr.splice(ido,1);

  localStorage.setItem("todos", JSON.stringify(arr) );


});

new_ques_form_btn.addEventListener("click",function(){
  resp_show_area.innerHTML="";
  ques_enter.style.display="block";
  ques_show.style.display="none";
});