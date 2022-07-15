const search = document.querySelector('#search')
        const btn_search = document.querySelector('#btn_submit')
        const danger = document.querySelector('.danger')
        const wel = document.querySelector('.welcome')
        const message = document.querySelector('.message')
        const container_infos = document.querySelector('.user_info')
        let list_repos = document.querySelector("#list_repos")

        btn_search.addEventListener('click', gitUser)
        
        async function gitUser() {
            let mudar = search.value
            if (!mudar) {
                return erro(`Insira um nome de Usuário válido.`)
            }
            try{
                const response = await fetch(`https://api.github.com/users/${mudar}`)
                const user = await response.json()
                const respos = await fetch(user.repos_url)
                const repositorios = await respos.json()
                const eaf = {

                name: user.name,
                bio: user.bio,
                local: user.location,
                followers: user.followers,
                following: user.following,
                avatar: user.avatar_url,
                repos: repositorios
            }
            console.log(user)
            if(user.name == undefined) {
                return erro(`Usuário não existe.`)
            }
                mostrarInformacoes(eaf) 
                search.value = ''
            } catch(err) {
                // erro(`Usário Inexistente`)
            }
        }

        function mostrarInformacoes(infos) {
            console.log(infos)
            
            let img = document.querySelector("#img_user")
            let name = document.querySelector(".name_user")
            let bio = document.querySelector(".bio_user")
            let location = document.querySelector(".user_location")
            let followers = document.querySelector(".followers_user")
            let following = document.querySelector(".following_user")
            

            wel.style.display = 'none'
            container_infos.style.display = 'flex' 

            img.src = infos.avatar
            name.innerHTML = infos.name
            bio.innerHTML = infos.bio
            location.innerHTML = infos.local
            followers.innerHTML = `Seguidores: ${infos.followers}`
            following.innerHTML = `Segue: ${infos.following}`
            
            let repositorios = infos.repos
            
            const numeroMinimo = repositorios.filter((elem, index, arr) => {
                    return index < 12
                })
                console.log(numeroMinimo)
            escreverRepos(numeroMinimo)
        }
        function escreverRepos(arr) {

            while (list_repos.firstChild) {
                list_repos.removeChild(list_repos.firstChild);
            }
            arr.forEach((elem, index, arr) => {

                let li = document.createElement("li")
                let aa = document.createElement("a")
                    li.classList.add("li_repos")
                    aa.classList.add("links_repos")
                    li.appendChild(aa)
                    list_repos.appendChild(li)    
                    aa.href = elem.clone_url
                    aa.innerHTML = elem.name     
                })
        }
        function erro(text) {
            container_infos.style.display = `none`
            wel.style.display = `flex`

            message.innerHTML = text
        }