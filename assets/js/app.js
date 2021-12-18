const render = (variables = {}) => {
  console.log("These are the current variables: ", variables);

  // General
  document.getElementById("name-profile").innerHTML = variables.name + " " + variables.lastname;
  document.getElementById("role-profile").innerHTML = variables.role;
  document.getElementById("city-profile").innerHTML = variables.city;
  document.getElementById("country-profile").innerHTML = variables.country;

  // Cover Image
  let cover_img = document.getElementById("cover-img");
  (variables.includeCover) ? cover_img.style.display = "block" : cover_img.style.display = "none";

  // Social Media Nav
  let smnav = document.getElementById("social-media-nav");
  smnav.classList.remove("order-first");
  smnav.classList.remove("order-last");
  smnav.classList.add((variables.socialMediaPosition === "left") ? "order-first" : "order-last");
  
  let smlinks = {
    "twitter" : "https://twitter.com/",
    "github" : "https://github.com/",
    "linkedin" : "https://www.linkedin.com/in/",
    "instagram" : "https://www.instagram.com/"
  }

  Object.keys(smlinks).forEach((value) => {
    let link = document.getElementById(value + "-link");
    link.classList.remove("disabled");

    if (variables[value] === null) {
      link.href = "#"; 
      link.classList.add("disabled");
    }
    else {
      link.href = smlinks[value] + variables[value];
    }
  });
}

window.onload = function() {
  window.variables = {
    includeCover: true,    
    name: "Jose Clemente",
    lastname: "García Rodríguez",
    role: "Web Developer",
    country: "Spain",
    city: "Madrid",
    socialMediaPosition: "right",
    twitter: null,
    github: "m4n50n",
    linkedin: "josegarciarodriguez",
    instagram: null,
  };

  render(window.variables);

  /*
  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
  */
};
