var formulario = document.querySelector("#search");
var input = document.querySelector("#username");
var profile = document.querySelector("#profile");

const name = document.querySelector(".profile-name");
const username = document.querySelector(".profile-username");
const bio = document.querySelector(".profile-bio")
const repoName = document.querySelector(".repo-name");
const repoStars = document.querySelector(".stars");
const repoForks = document.querySelector(".forks");

const client_id = "658272d3dab761dfc7e5";
const client_secret = "23a96c25a7556e53efde2434bc3b7e714b80cd40";

const fetchUsers = async (user) =>{
    const user_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await user_call.json();
    return { data }
}

const fetchRepositories = async (user) =>{
    const repos_call = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await repos_call.json();
    return { data }
}

const showData = () =>{
    fetchUsers(input.value).then((res) =>{
        console.log(res);

        if (res.data.message != "Not Found"){
            document.querySelector("#profile").style.display = "block";
            username.innerHTML = `@${res.data.login}`;
            name.innerHTML = `${res.data.name}`;
            bio.innerHTML = `${res.data.bio}`;
            document.querySelector(".error").style.display = "none";
            document.querySelector("#search").style.borderBottomLeftRadius = "0px";
            document.querySelector("#search").style.borderBottomRightRadius = "0px";
            document.querySelector("#profile").style.borderTopLeftRadius = "0px";
            document.querySelector("#profile").style.borderTopRightRadius = "0px";
            document.querySelector("#profile").style.marginTop = "0px";
            document.querySelector(".error").style.display = "none";
        }
        else
            if ((res.data.message == "Not Found") || (!res.data.login)){
                document.querySelector("#profile").style.display = "none";
                document.querySelector(".error").style.display = "block";
            }

    });
    fetchRepositories(input.value).then((res) =>{
        console.log(res);

        const repositories = document.querySelector(".repositories");
        const rep = [];
        var html = '';
        for (var i=0; i<res.data.length; i++){
            rep.push({
                key: res.data[i],
                sortable: true,
                resizeable: true
            });
        }
        rep.forEach((repo)=>{
            html += `            
            <div class="item">                  
                <span class="repo-name">${repo.key.name}</span>
                <div class="data">
                    <i class="fas fa-star"></i>
                    <span class="stars">${repo.key.stargazers_count}</span>
                    <i class="fas fa-code-branch"></i>
                    <span class="forks">${repo.key.forks}</span>
                </div>
            </div>
            <hr>`;
        })
        repositories.innerHTML = html;
        console.log(rep);
    });
}

formulario.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    showData();
});