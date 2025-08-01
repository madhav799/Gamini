
const show_output=document.querySelector(".show-trains");
const hide_input=document.querySelector(".top-top-st-code");
const loading=document.querySelector(".loader");
const stat_input=document.querySelector(".st-code-input");
const sub_but=document.querySelector(".button-68");
const origin_train=document.querySelector(".origin-train")
const pass_train=document.querySelector(".pass-train")
const dest_train=document.querySelector(".dest-train")
const org_right=document.querySelector(".right_org")
const org_left=document.querySelector(".left_org")
const pass_right=document.querySelector(".right_pass")
const pass_left=document.querySelector(".left_pass")
const dest_right=document.querySelector(".right_dest")
const dest_left=document.querySelector(".left_dest")
const show_error = document.querySelector(".top-error");
 var origin_array=new Array();
 var ori_pages;


 var pass_array=new Array();
 var pass_pages;

 var dest_array_array=new Array();
 var dest_pages;


async function get_response(stcode)
{
console.log(stcode)
const options = {
  method: "GET",
  url: "https://irctc1.p.rapidapi.com/api/v3/getTrainsByStation",
  params: {
    stationCode: stcode,
  },
  headers: {
    // "X-RapidAPI-Key": "07cd06475bmshe4b7c90f93c9c80p1cda5fjsna3b003ac7d95",
    "X-RapidAPI-Key": "f5f35543dfmsh48fcdb9e6b6f345p16e4eejsn82174aa9f4b6",
    "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
  },
};

try {
	const response = await axios.request(options);
	console.log(response.data);
    return response.data;
} catch (error) {
	console.error(error);
}

}

sub_but.addEventListener("click" ,async(e)=>
{    
  loading.classList.add("active");
    const response=await get_response(stat_input.value.toUpperCase());
    console.log(response);

 origin_array=response.data.originating;
 pass_array=response.data.passing;
 dest_array=response.data.destination;
 


ori_pages=(origin_array.length/ 10) + ((origin_array.length % 10) !== 0)
ori_pages=Math.floor(ori_pages)
console.log(ori_pages)
console.log(origin_array.length)
 origin_det(0);


pass_pages=(pass_array.length/ 10) + ((pass_array.length % 10) !== 0)
pass_pages=Math.floor(pass_pages)
console.log(pass_pages)
console.log(pass_array.length)
 pass_det(0);


dest_pages=(dest_array.length/ 10) + ((dest_array.length % 10) !== 0)
dest_pages=Math.floor(dest_pages)
console.log(dest_pages)
console.log(dest_array.length)
 dest_det(0);


loading.classList.remove("active");
hide_input.classList.add("active");



if (response.data.passing && response.data.passing.length>0)
  show_output.classList.add("active");
else 
show_error.classList.add("active");

})

function origin_det(org_ind)
{

 
  var count=0;
  // origin_train.appendChild(org_child_1);
for(var i=org_ind*10;i<origin_array.length && count <10 ;i++)
{


    var newChild1 = document.createElement("tr");
    var newSubChild1 =document.createElement("td"); 
    var newSubChild2 =document.createElement("td"); 
    var newSubChild3 =document.createElement("td");

    newSubChild1.textContent=origin_array[i].trainNo;
    newSubChild2.textContent=origin_array[i].trainName;
    newSubChild3.textContent=origin_array[i].departureTime;
    newChild1.appendChild(newSubChild1);
    newChild1.appendChild(newSubChild2);
    newChild1.appendChild(newSubChild3);

    origin_train.appendChild(newChild1);
     
    count++;
}

}

var org_ind=0;

const org_child_1=origin_train.firstChild;
console.log(org_child_1)

org_right.addEventListener("click",()=>
{
  console.log("clicked",org_ind)
  if(org_ind+1<ori_pages ){
    org_ind+=1;
   origin_train.innerHTML="";
   origin_det(org_ind)
   }
   else{
    alert("no more right");
   }
})

org_left.addEventListener("click",()=>
{
  console.log("clicked" ,org_ind)
  if(org_ind>0){
    org_ind-=1;
  
    origin_train.innerHTML="";
    origin_det(org_ind)
  }
  else{
    alert("no more left");
  }
})




function pass_det(pass_ind)
{

 
  var count=0;
for(var i=pass_ind*10;i<pass_array.length && count <10 ;i++)
{

  var newChild1 = document.createElement("tr");
  var newSubChild1 =document.createElement("td"); 
  var newSubChild2 =document.createElement("td"); 
  var newSubChild3 =document.createElement("td");
  var newSubChild4 =document.createElement("td");

  newSubChild1.textContent=pass_array[i].trainNo;
  newSubChild2.textContent=pass_array[i].trainName;
  newSubChild3.textContent=pass_array[i].arrivalTime;
  newSubChild4.textContent=pass_array[i].departureTime;
  newChild1.appendChild(newSubChild1);
  newChild1.appendChild(newSubChild2);
  newChild1.appendChild(newSubChild3);
  newChild1.appendChild(newSubChild4);

  pass_train.appendChild(newChild1);
     
    count++;
}

}

var pass_ind=0;



pass_right.addEventListener("click",()=>
{
  console.log("clicked",pass_ind)
  if(pass_ind+1<pass_pages ){
    pass_ind+=1;
   pass_train.innerHTML="";
   pass_det(pass_ind)
   }
   else{
    alert("no more right");
   }
})

pass_left.addEventListener("click",()=>
{
  console.log("clicked" ,pass_ind)
  if(pass_ind>0){
    pass_ind-=1;
  
    pass_train.innerHTML="";
    pass_det(pass_ind)
  }
  else{
    alert("no more left");
  }
})




function dest_det(dest_ind)
{

 
  var count=0;
for(var i=dest_ind*10;i<dest_array.length && count <10 ;i++)
{

  var newChild1 = document.createElement("tr");
  var newSubChild1 =document.createElement("td"); 
  var newSubChild2 =document.createElement("td"); 
  var newSubChild3 =document.createElement("td");
  // var newSubChild4 =document.createElement("td");

  newSubChild1.textContent=dest_array[i].trainNo;
  newSubChild2.textContent=dest_array[i].trainName;
  newSubChild3.textContent=dest_array[i].arrivalTime;
  // newSubChild4.textContent=pass_array[i].departureTime;
  newChild1.appendChild(newSubChild1);
  newChild1.appendChild(newSubChild2);
  newChild1.appendChild(newSubChild3);
  // newChild1.appendChild(newSubChild4);

  dest_train.appendChild(newChild1);
     
    count++;
}

}

var dest_ind=0;



dest_right.addEventListener("click",()=>
{
  console.log("clicked",dest_ind)
  if(dest_ind+1<dest_pages ){
    dest_ind+=1;
   dest_train.innerHTML="";
   dest_det(dest_ind)
   }
   else{
    alert("no more right");
   }
})

dest_left.addEventListener("click",()=>
{
  console.log("clicked" ,dest_ind)
  if(dest_ind>0){
    dest_ind-=1;
  
    dest_train.innerHTML="";
    dest_det(dest_ind)
  }
  else{
    alert("no more left");
  }
})