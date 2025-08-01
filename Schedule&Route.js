const st_code=document.querySelector(".st-code-input");
const submit =document.querySelector(".button-68");
const train_no=document.querySelector(".tr-no-resp");
const train_nm=document.querySelector(".tr-nm-resp");
const rundy=document.querySelector(".run-days");
const route_list=document.querySelector(".train-route-li");
const loading=document.querySelector(".loader");
const hide_input=document.querySelector(".input-section")
const show_output=document.querySelector(".train_top_output")
const show_error = document.querySelector(".top-error");
async function get_response(tr_no)
{
    

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule',
  params: {trainNo: tr_no},
  headers: {
    'X-RapidAPI-Key': '374fe8bb26msh25dc509fadb6daep16f529jsneff256bc829c',
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

submit.addEventListener("click",async(e)=>
{
  loading.classList.add("active");
    const response=await get_response(st_code.value);
    console.log(response);
     train_no.innerHTML=response.data.trainNumber;
     train_nm.innerHTML=response.data.trainName;


     const train_run_obj=response.data.runDays;
     console.log(response.data.runDays);
  console.log("prince");
//   console.log(train_run_array.length)
    //  for(var i=0;i<train_run_array.length;i++)
    //  {
    //     console.log(train_run_array[i]);
    //        if(train_run_array[i]===true)
    //        {
    //            const day=document.createElement('p');
    //            day.innerText=train_run_array[i];
    //            rundy.appendChild(day);

             
    //        }
    //  }


     for (const d in train_run_obj) {
       if(train_run_obj[d]===true)
       {
           const day=document.createElement('p');
               day.innerText=d;
               rundy.appendChild(day);
       }
    }

     console.log("koshti")


     const  train_route_array=response.data.route;


     for(var i=0;train_route_array && i<train_route_array.length;i++)
     {
        const child=document.createElement('li');
        const subchild1=document.createElement('span');
        subchild1.innerText=`Station-${i}`;
        child.appendChild(subchild1);

        const subchild2=document.createElement('div');
        subchild2.className='content';

        const subsubchild1=document.createElement('h3');
        subsubchild1.innerText=`${train_route_array[i].station_name}(${train_route_array[i].station_code}) `;
        subchild2.appendChild(subsubchild1);

        const subsubchild2=document.createElement('h3');
        subsubchild2.innerText=`Platform:${train_route_array[i].platform_number}`;
        subchild2.appendChild(subsubchild2);

        const subsubchild3=document.createElement('p');
        subsubchild3.innerText=`Ontime-rating:${train_route_array[i].on_time_rating}`;
        subchild2.appendChild(subsubchild3);

        const subsubchild4=document.createElement('p');
        subsubchild4.innerText=`State:${train_route_array[i].state_name}(${train_route_array[i].state_code}) `;
        subchild2.appendChild(subsubchild4);

    child.appendChild(subchild2);
   route_list.appendChild(child);


     }

  loading.classList.remove("active");
  hide_input.classList.add("active");
  
  if (response.data.trainName) show_output.classList.add("active");
  // show_out.classList.add("active");
  else {
    show_error.classList.add("active");
  }





})