let url = "http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("#btn");
let uls = document.querySelector("#universities");

btn.addEventListener("click", async () => {
  let country = document.querySelector("#country").value;
  let state = document.querySelector("#state").value;
  console.log('Country:', country, 'State:', state);
  
  if (country) {
    let universities = await getUniversities(country, state);
    displayUniversities(universities);
  }
});

async function getUniversities(country, state) {
  try {
    let response = await axios.get(url + country);
    response = response.data;
    if (state) {
      response = response.filter(
        (response) => response["state-province"] === state
      );
    }
    return response;
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
}

function displayUniversities(universities) {
  uls.innerHTML = ""; // Clear previous results
  for (let university of universities) {
    let li = document.createElement("li");
    li.textContent = university.name;
    console.log('University:', university["state-province"]);

    uls.appendChild(li);
  }
}
