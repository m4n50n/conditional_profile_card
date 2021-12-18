const render = (variables = {}) => {
  console.log("These are the current variables: ", variables);

  // General
  document.querySelector("#name-profile").innerHTML = variables.name;
  document.querySelector("#role-profile").innerHTML = variables.role;

  let direction = []
  if (variables.city !== "") { direction.push(variables.city); }
  if (variables.country !== "") { direction.push(variables.country.toUpperCase()); }

  if (direction.lenght !== 0) {
    document.querySelector("#direction-profile").innerHTML = direction.join(", ");
  }

  // Cover Image
  let cover_img = document.querySelector("#cover-img");
  cover_img.src = `./assets/img/cover-${variables.coverimg}.jpg`;
  
  (variables.include_cover == "true") ? cover_img.style.display = "block" : cover_img.style.display = "none";
  
  // Social Media Nav
  let smnav = document.querySelector("#social-media-nav");
  smnav.classList.remove("order-first");
  smnav.classList.remove("order-last");
  smnav.classList.add((variables.sm_position === "left") ? "order-first" : "order-last");
  
  let smlinks = {
    "twitter" : "https://twitter.com/",
    "github" : "https://github.com/",
    "linkedin" : "https://www.linkedin.com/in/",
    "instagram" : "https://www.instagram.com/"
  }

  Object.keys(smlinks).forEach((value) => {
    let link = document.querySelector("#" + value + "-link");
    link.classList.remove("disabled");

    if (variables[value] === "") {
      link.href = "#"; 
      link.classList.add("disabled");
    }
    else {
      link.href = smlinks[value] + variables[value];
    }
  });
}

const empty_value = (element) => {
  let prev_input = element.previousElementSibling;
  prev_input.value = '';
  prev_input.dispatchEvent(new Event("change")); // trigger change event
}

window.onload = function() {
  window.variables = {
    include_cover: document.querySelector("#include_cover").value,
    coverimg: Math.floor(Math.random() * 3) + 1,
    sm_position: document.querySelector("#sm_position").value,
    name: document.querySelector("#name").value,
    role: document.querySelector("#role").value,
    city: document.querySelector("#city").value,
    country: document.querySelector("#country").value,
    twitter: document.querySelector("#twitter").value,
    github: document.querySelector("#github").value,
    linkedin: document.querySelector("#linkedin").value,
    instagram: document.querySelector("#instagram").value
  };

  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute_id = e.target.getAttribute("id");
      let values = {};

      values[attribute_id] = (this.value == "" || this.value == null) ? "" : this.value;

      console.log(values);
      render(Object.assign(window.variables, values));
    });
  });
};
