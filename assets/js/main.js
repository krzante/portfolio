
//Json loader
document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects-container");

    // Fetch JSON data
    fetch("assets/files/projects.json")
        .then((response) => response.json())
        .then((data) => {
            // Loop through the projects array
            data.projects.forEach((project) => {
                // Create a project card element
                const projectCard = document.createElement("div");
                projectCard.classList.add("row", "my-5", "justify-content-center", "hidden"); //

                // Left column
                const leftColumn = document.createElement("div");
                leftColumn.classList.add("col-sm-5", "justify-content-start");

                const titleElement = document.createElement("h3");
                titleElement.classList.add("color-3", "text-start");
                titleElement.textContent = project.title;
                leftColumn.appendChild(titleElement);

                const technologiesContainer = document.createElement("div");
                technologiesContainer.classList.add("technologies-container");
                project.technologies.forEach((tech) => {
                    const techButton = document.createElement("button");
                    techButton.classList.add("btn-disabled");
                    techButton.textContent = tech;
                    techButton.disabled = true;
                    technologiesContainer.appendChild(techButton);
                });
                leftColumn.appendChild(technologiesContainer);

                // Description COntainer
                const descriptionElement = document.createElement("p");
                descriptionElement.classList.add("color-3", "text-start");
                descriptionElement.textContent = project.description;
                leftColumn.appendChild(descriptionElement);

                // Demo and Source Code Buttons
                const linksContainer = document.createElement("div");
                linksContainer.classList.add("links-container");
                project.links.forEach((link) => {
                    const linkElement = document.createElement("a");
                    linkElement.classList.add("btn", "btn-success");
                    linkElement.href = link.link;
                    linkElement.target = "_blank";
                    linkElement.textContent = link.type;
                    linksContainer.appendChild(linkElement);
                });
                leftColumn.appendChild(linksContainer);

                projectCard.appendChild(leftColumn);

                // Right column - Images
                const rightColumn = document.createElement("div");
                rightColumn.classList.add("col-sm-5", "justify-content-center", "align-items-center");

                const imageElement = document.createElement("img");
                imageElement.src = project.image;
                imageElement.classList.add("img-fluid", "rounded");
                // imageElement.alt = project.title;
                rightColumn.appendChild(imageElement);

                projectCard.appendChild(rightColumn);

                // Append the project card to the container
                projectsContainer.appendChild(projectCard);
            });



            //Hidden animator --
            const observer = new IntersectionObserver((entries) =>{
                entries.forEach((entry) => {
                    console.log(entry);
                    if (entry.isIntersecting){
                        entry.target.classList.add('show');
                    } 
                    // else {
                    //     entry.target.classList.remove('show');
                    // }
                });
            });
            
            
            const hiddenElements = document.querySelectorAll('.hidden, .hidden-below');
            hiddenElements.forEach((el) => observer.observe(el));
            
            window.smoothScroll = function(target) {
                var scrollContainer = target;
                do { //find scroll container
                    scrollContainer = scrollContainer.parentNode;
                    if (!scrollContainer) return;
                    scrollContainer.scrollTop += 1;
                } while (scrollContainer.scrollTop == 0);
            
                var targetY = 0;
                do { //find the top of target relatively to the container
                    if (target == scrollContainer) break;
                    targetY += target.offsetTop;
                } while (target = target.offsetParent);
            
                scroll = function(c, a, b, i) {
                    i++; if (i > 30) return;
                    c.scrollTop = a + (b - a) / 30 * i;
                    setTimeout(function(){ scroll(c, a, b, i); }, 20);
                }
                // start scrolling
                scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
});

