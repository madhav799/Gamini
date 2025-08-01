const train_no=document.querySelector(".inp-tra-no");
const source=document.querySelector(".inp-src");
const desti=document.querySelector(".inp-des");
const hide_input=document.querySelector(".input-section")
const show_out=document.querySelector(".show-info");
const loading=document.querySelector(".loader");
const submit_but=document.querySelector(".submit-button");





async function get_response(train,src,des)
{
    

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v2/getFare',
  params: {
    trainNo: train,
    fromStationCode: src,
    toStationCode: des
  },
  headers: {
    'X-RapidAPI-Key': 'e1aa14092bmsh46a7b7297d0ff9fp1a1491jsn9956860de603',
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


submit_but.addEventListener("click", async(e) => {
  loading.classList.add("active");
    // console.log(train_no.value , source.value,desti.value);
    const response=await get_response(train_no.value,source.value.toUpperCase() ,desti.value.toLowerCase());
    // console.log(response);
    const gener=response?.data?.general;
    const tatkal=response.data.tatkal;
    console.log(gener.length)
    const table_select=document.querySelector(".show-table-info");
    hide_input.classList.add("active");
   for(var i=0;i<gener.length;i++)
   {
    // console.log(gener);
    var newChild1 = document.createElement("tr");
    var newSubChild1 =document.createElement("td"); 
    var newSubChild2 =document.createElement("td"); 
    var newSubChild3 =document.createElement("td"); 

    newSubChild1.textContent = gener[i].classType;
    // newSubChild2.textContent = gener[i].fare;
    if(gener[i].fare=='')
    {

        newSubChild2.textContent = "NA";
    }
    else
    {
        newSubChild2.textContent=gener[i].fare;
    }

    if(tatkal[i].fare=='')
    {

        newSubChild3.textContent = "NA";
    }
    else
    {
        newSubChild3.textContent=tatkal[i].fare;
    }

    newChild1.appendChild(newSubChild1);
    newChild1.appendChild(newSubChild2);
    newChild1.appendChild(newSubChild3);

    table_select.appendChild(newChild1);

   }
   loading.classList.remove("active");
show_out.classList.add("active");


});