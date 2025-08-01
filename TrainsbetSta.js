const source=document.querySelector(".src-nm");
const destination=document.querySelector(".ds-nm");
const date=document.querySelector(".doj");
const submit=document.querySelector(".button-68");
const append_det=document.querySelector(".show-trains");
const loading=document.querySelector(".loader");
const hide_input=document.querySelector(".input-info");
const show_out=document.querySelector(".show-trains");
const show_error = document.querySelector(".top-error");
async function get_response(src,dest,doj)
{
  

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
  params: {
    fromStationCode: src,
    toStationCode: dest,
    dateOfJourney: doj
  },
  headers: {
    'X-RapidAPI-Key': '818231618emshdd755b0078b204ap14794ejsnfd4b490fa409',
    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
    return response.data;
} catch (error) {
	console.error(error);
}
}


submit.addEventListener("click", async(e)=>
{
   console.log(source.value.toUpperCase(),destination.value.toUpperCase(),date.value);
   loading.classList.add("active");
    const response=await get_response(source.value.toUpperCase(),destination.value.toUpperCase(),date.value);

    const data_array=response.data;

    for(var i=0;i<data_array.length;i++)
    {
        console.log("prince");
        var parent = document.createElement("div");
        parent.className = "train-details";
        
        var child1 = document.createElement("p");
        var subchild1 = document.createElement("span");
        subchild1.innerText = data_array[i].train_number;
        child1.textContent = `Train No: `;
        child1.appendChild(subchild1);
        parent.appendChild(child1);
        
        var child2 = document.createElement("p");
        var subchild2 = document.createElement("span");
        subchild2.innerText = data_array[i].train_name;
        child2.textContent = `Train Name:`;
        child2.appendChild(subchild2);
        parent.appendChild(child2);
        
        var child3 = document.createElement("p");
        var subchild3 = document.createElement("span");
        subchild3.innerText = data_array[i].from_sta;
        child3.textContent = `Arr. Time (from):`;
        child3.appendChild(subchild3);
        parent.appendChild(child3);
        
        var child4 = document.createElement("p");
        var subchild4 = document.createElement("span");
        subchild4.innerText = data_array[i].from_std;
        child4.textContent = ` Dept. Time (from):`;
        child4.appendChild(subchild4);
        parent.appendChild(child4);
        
        var child5 = document.createElement("p");
        var subchild5 = document.createElement("span");
        subchild5.innerText = data_array[i].to_sta;
        child5.textContent = `Arr. Time (to):`;
        child5.appendChild(subchild5);
        parent.appendChild(child5);
        
        var child6 = document.createElement("p");
        var subchild6 = document.createElement("span");
        subchild6.innerText = data_array[i].to_std;
        child6.textContent = `Dept. Time (to):`;
        child6.appendChild(subchild6);
        parent.appendChild(child6);
        
        var child7 = document.createElement("p");
        var subchild7 = document.createElement("span");
        subchild7.innerText = data_array[i].duration;
        child7.textContent = `Duration:`;
        child7.appendChild(subchild7);
        parent.appendChild(child7);
        
        var child8 = document.createElement("p");
        var subchild8 = document.createElement("span");
        subchild8.innerText = data_array[i].distance;
        child8.textContent = `Distance:`;
        child8.appendChild(subchild8);
        parent.appendChild(child8);
        
        append_det.appendChild(parent);

    }
    loading.classList.remove("active");
    hide_input.classList.add("active");
    if (data_array && data_array.length > 0) 
      show_out.classList.add("active");
    else {
      show_error.classList.add("active");
    }

})
