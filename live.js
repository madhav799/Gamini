
const tr_code=document.querySelector(".st-code-input");
const submit=document.querySelector(".button-68");
const cur_stat0=document.querySelector(".gen-resp0")
const cur_stat1=document.querySelector(".gen-resp1")
const cur_stat2=document.querySelector(".gen-resp2")
const cur_stat3=document.querySelector(".gen-resp3")
const cur_stat4=document.querySelector(".gen-resp4")
const cur_stat5=document.querySelector(".gen-resp5")
const cur_stat6=document.querySelector(".gen-resp6")
const cur_stat7=document.querySelector(".gen-resp7")
const curr_ul=document.querySelector(".current-ul");
const prev_ul=document.querySelector(".prev-ul");
const upcom_ul=document.querySelector(".upcom-ul");
const loading=document.querySelector(".loader");
const hide_input=document.querySelector(".input-section");
const show_out=document.querySelector(".top-status-info");
// const prev_more_info=document.querySelector(".prev-stat-li-info");
const show_error = document.querySelector(".top-error");

async function get_data(tn)
{
   

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus',
  params: {
    trainNo: tn,
    startDay: '1'
   
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

submit.addEventListener("click",async(e)=>{
  loading.classList.add("active");
    const response=await get_data(tr_code.value)
    console.log(response);

    cur_stat0.innerHTML=response.data.train_name;
    cur_stat1.innerHTML=response.data.status_as_of;
    cur_stat2.innerHTML=`${response.data.journey_time} min`;
    
    cur_stat3.innerHTML= `${response.data.current_station_name}(${response.data.current_station_code})`;
    cur_stat4.innerHTML=response.data.update_time;
    cur_stat5.innerHTML=response.data.cur_stn_sta;
     cur_stat6.innerHTML=response.data.cur_stn_std;
    cur_stat7.innerHTML=response.data.stoppage_number;

    
    const curr_array=response.data?.current_location_info;

    for(var i=0;curr_array && i<curr_array.length;i++)
    {
      const child1=document.createElement('li');
      const subchild1=document.createElement('span');
      subchild1.innerText=curr_array[i].readable_message;
      child1.appendChild(subchild1);
      
      const subchild2=document.createElement('div');
      subchild2.className='current-content';
      
      
      const subsubchild1=document.createElement('h3');
      subsubchild1.innerText=curr_array[i].label;
      const subsubchild2=document.createElement('p');
      subsubchild2.innerText=curr_array[i].hint;
      subchild2.appendChild(subsubchild1);
      subchild2.appendChild(subsubchild2);
      child1.appendChild(subchild2);

      curr_ul.appendChild(child1);


    
      

    }


    const prev_array=response.data?.previous_stations;

    for (var i = 0; prev_array && i < prev_array.length; i++) {
      const parent = document.createElement("li");
      const child1 = document.createElement("span");
      child1.innerText = `Station-${prev_array[i].stoppage_number}`;
      parent.appendChild(child1);

      const child2 = document.createElement("div");
      child2.className = "prev-stat-li-info";

      const subchild1 = document.createElement("h3");
      subchild1.className = "prev-child";
      subchild1.innerText = `${prev_array[i].station_name}(${prev_array[i].station_code})`;
      child2.appendChild(subchild1);
      console.log("prince");

      const subchild2 = document.createElement("h3");
      subchild2.className = "prev-child";
      subchild2.innerText = `Platform:(${prev_array[i].platform_number})`;
      child2.appendChild(subchild2);

      const subchild3 = document.createElement("h3");
      subchild3.className = "prev-child";
      subchild3.innerText = `Actual arr. time :(${prev_array[i].sta})`;
      child2.appendChild(subchild3);

      const subchild4 = document.createElement("h3");
      subchild4.className = "prev-child";
      subchild4.innerText = `Expected arr. time :(${prev_array[i].eta})`;
      child2.appendChild(subchild4);

      const subchild5 = document.createElement("h3");
      subchild5.className = "prev-child";
      subchild5.innerText = `Actual dept. time :(${prev_array[i].std})`;
      child2.appendChild(subchild5);

      const subchild6 = document.createElement("h3");
      subchild6.className = "prev-child";
      subchild6.innerText = `Expected dept. time :(${prev_array[i].etd})`;
      child2.appendChild(subchild6);

      const subchild7 = document.createElement("h3");
      subchild7.className = "prev-child";
      subchild7.innerText = `Arrival delay:(${prev_array[i].arrival_delay})`;
      child2.appendChild(subchild7);

      parent.appendChild(child2);
      prev_ul.appendChild(parent);
      console.log("koshti");
    }

    const up_array=response.data?.upcoming_stations;

    for (var i = 0; up_array && i < up_array.length; i++) {
      const parent = document.createElement("li");
      const child1 = document.createElement("span");
      child1.innerText = `Station-${up_array[i].stoppage_number}`;
      parent.appendChild(child1);

      const child2 = document.createElement("div");
      child2.className = "prev-stat-li-info";

      const subchild1 = document.createElement("h3");
      subchild1.className = "prev-child";
      subchild1.innerText = `${up_array[i].station_name}(${up_array[i].station_code})`;
      child2.appendChild(subchild1);
      console.log("prince");

      const subchild2 = document.createElement("h3");
      subchild2.className = "prev-child";
      subchild2.innerText = `Platform:(${up_array[i].platform_number})`;
      child2.appendChild(subchild2);

      const subchild3 = document.createElement("h3");
      subchild3.className = "prev-child";
      subchild3.innerText = `Actual arr. time :(${up_array[i].sta})`;
      child2.appendChild(subchild3);

      const subchild4 = document.createElement("h3");
      subchild4.className = "prev-child";
      subchild4.innerText = `Expected arr. time :(${up_array[i].eta})`;
      child2.appendChild(subchild4);

      const subchild5 = document.createElement("h3");
      subchild5.className = "prev-child";
      subchild5.innerText = `Actual dept. time :(${up_array[i].std})`;
      child2.appendChild(subchild5);

      const subchild6 = document.createElement("h3");
      subchild6.className = "prev-child";
      subchild6.innerText = `Expected dept. time :(${up_array[i].etd})`;
      child2.appendChild(subchild6);

      const subchild7 = document.createElement("h3");
      subchild7.className = "prev-child";
      subchild7.innerText = `Arrival delay:(${up_array[i].arrival_delay})`;
      child2.appendChild(subchild7);

      parent.appendChild(child2);
      upcom_ul.appendChild(parent);
      console.log("koshti");
    }

    loading.classList.remove("active");
    hide_input.classList.add("active");

    if (response.data.status_as_of) show_out.classList.add("active");
    else show_error.classList.add("active");

})