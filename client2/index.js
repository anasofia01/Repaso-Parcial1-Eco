document.getElementById("fetch-button").addEventListener("click", fetchData);

async function fetchData() {
  renderLoadingState();
  try {
    const response = await fetch("http://localhost:5050/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error(error);
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data

  if (data.players.length > 0) {
    data.players.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = item.name;
      div.innerHTML = `<img src="${item.profilePicture}" /><p>${item.name}</p>`;
      container.appendChild(div);
    });
  }
}
