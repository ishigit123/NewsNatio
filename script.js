const api_key = "2ca4adf4b38648768508dce30750970a";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',() =>fetchNews("India"));

async function fetchNews(query){
   const res =  await fetch(`${url}${query}&apiKey=${api_key}`);
   const data = await res.json();
   console.log(data);
   bindData(data.articles);
}
function reload(){
    window.location.reload();
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-row');
    const newsTemplate = document.getElementById('news-card-temp');
    cardsContainer.innerHTML="";
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone = newsTemplate.content.cloneNode(true);//deep cloning of all nested elements
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone); 

        
    });
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsSource = cardClone.querySelector('#news-source');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');
    const moreBtn = cardClone.querySelector('.btn-primary');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"})
    newsSource.innerHTML = `${article.source.name} . ${date}`;
    moreBtn.href = article.url;
    moreBtn.target = "_blank";

}
let currentSelNav = null;
function onNavBarClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelNav?.classList.remove('active');
    currentSelNav = navItem;
    currentSelNav.classList.add('active');
}
const searchButton = document.getElementById('searchBtn');
const searchText = document.getElementById('searchText');
searchButton.addEventListener("click", () => {
    event.preventDefault();
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
});
