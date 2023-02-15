const API_URL =
  "https://api.github.com/repositories/1296269/issues";



const currPage = document.getElementById("current-page");

let pageNumber = 1;
let pageSize = 5;

function fetchIssues(pageNumber) {
  fetch(API_URL + `?page=${pageNumber}&per_page=${pageSize}`)
    .then((response) => response.json())
    .then((issues) => {
      const issuesContainer = document.getElementById("issues-container");
      issuesContainer.innerHTML=''
      issues.forEach((issue) => {
        currPage.innerText=`Page Number : ${pageNumber}`
        const issueElement = document.createElement("div");
        issueElement.className= "issue";
        issueElement.innerHTML = `
          <h3>${issue.title}</h3>
          <p>${issue.body}</p>
          <ol>
            ${issue.labels.map((label) => `<li>${label.name}</li>`).join("")}
          </ol>
        `;
        issuesContainer.appendChild(issueElement);
      });
    });
}

fetchIssues(pageNumber);

const prevPage = document.getElementById("load_prev");
const loadMoreButton = document.getElementById("load_next");
prevPage.addEventListener("click",()=>{
  // issueElement.innerHTML=''
    if(pageNumber>1){
        pageNumber--;
    }
    fetchIssues(pageNumber);
})
loadMoreButton.addEventListener("click", () => {
  // issueElement.innerHTML=''
  pageNumber++;
  fetchIssues(pageNumber);
});

