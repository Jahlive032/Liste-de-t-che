var compteur = 0, select = 0;

window.onload = function(){
    loadTasks();
}

function add_to_list(){
    // Récupérer les valeurs du formulaire
    var titre = document.querySelector("#title").value;
        description = document.querySelector("#description").value;
        categorie = document.querySelector("#categorie").value;
        date = document.querySelector("#date").value;

    // Création d'un objet représentant une tâche
    var task = {
        titre,
        description,
        categorie,
        date,
        finished: false,
    };

    // Sauvegarder la tâche dans le localStorage
    saveTask(task);


     // Attribution de la catégorie à la variable 'select'
    switch (categorie){
        case "travail":
            select = 0;
                break;
        case "maison":
            select = 1;
                break;
        case "business":
            select = 2;
                break;
        case "sport":
            select = 3;
                break;
        case "personnel":
            select = 4;
                break;            
    }
 
    // Définir les classes CSS pour créer la nouvelle tâche
    var class_li = ['list_travail list_dsp_none ', 'list_maison list_dsp_none ', 'list_business list_dsp_none ', 'list_sport list_dsp_none ', 'list_personnel list_dsp_none '];

    // Construction du contenu HTML de la nouvelle tâche
    var cont = '<div class="aff_categorie"> <p>'+categorie+'</p> </div> <div class="aff_info"> <h4 style="text-align: center;">'+titre+'</h4> <p>'+description+'</p> </div> <div class="aff_date"> <div class="info_date"> <p>'+date+'</p> </div> <div class="options"> <ul> <li> <a href="#finish" onclick="finish_action('+select+', '+compteur+');"><i class="fa-solid fa-circle-check" style="color: #fca311;"></i></a> </li> </br></ul> </div>  </div>';

    // Création d'un nouvel élément "li" avec les classes
    var li = document.createElement("li");
        li.className = class_li[select] + " li_num_"+compteur;

    // Ajouter du contenu HTML à l'élément "li"
    li.innerHTML = cont;
    document.querySelectorAll('.creation > ul')[0].appendChild(li);

    // Faire l'animation d'affichage de la nouvelle tâche
    setTimeout(function(){
        document.querySelector('.li_num_'+compteur).style.display = "flex";
    },100);

    // Faire l'animation de mise à jour des classes CSS
    setTimeout(function(){
        document.querySelector('.li_num_'+compteur).className="list_dsp_true "+class_li[select]+"li_num_"+compteur;
        compteur++;
    },200);

    
}

function saveTask(task){
    var tasks = JSON.parse(localStorage.getItem('tasks')) ||  [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var todoList = document.querySelector('.creation > ul');
    
    tasks.foreach(function(){
        var class_li = ['list_travail list_dsp_none ', 'list_maison list_dsp_none ', 'list_business list_dsp_none ', 'list_sport list_dsp_none ', 'list_personnel list_dsp_none '];
        var li = document.createElement("li");
        li.className = class_li[select] + " li_num_"+compteur;

        var cont = '<div class="aff_categorie"> <p>'+categorie+'</p> </div> <div class="aff_info"> <h4 style="text-align: center;">'+titre+'</h4> <p>'+description+'</p> </div> <div class="aff_date"> <div class="info_date"> <p>'+date+'</p> </div> <div class="options"> <ul> <li> <a href="#finish" onclick="finish_action('+select+', '+compteur+');"><i class="fa-solid fa-circle-check" style="color: #fca311;"></i></a></li> </br></ul> </div>  </div>';

        // Injecter le contenu HTML dans l'élément li
        li.innerHTML = cont;

        todoList.appendChild(li);
    });
    // Appelle la fonction loadTasks au chargement de la page pour afficher les tâches récupérées
    document.addEventListener('DOMContentLoaded',loadTasks);
}


function del_finish(){

    // Sélection de tous les éléments li avec la classe CSS "list_finish_state"
    var li = document.querySelectorAll(".list_finish_state");

    // Récupération des tâches depuis le stockage local ou initialisation d'un tableau vide
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Filtrer les tâches pour exclure celles marquées comme terminées (isFinished = true)
    var updateTasks = tasks.filter(function(task){
        return !task.finished;
    });

    // Mettre à jour les tâches dans le stockage local
    localStorage.setItem('tasks', JSON.stringify(updateTasks));

     // Animer la suppression visuelle des éléments li marqués comme terminés
        for(var e = 0; e < li.length; e++){
            li[e].style.opacity = "0";
            li[e].style.height = "0px";      
            li[e].style.margin = "0px";      
        }

    // Après un délai de 500 millisecondes
    setTimeout(function(){

    // Sélectionner à nouveau tous les éléments li avec la classe CSS "list_finish_state"
    var li = document.querySelectorAll(".list_finish_state");

    // Supprimer physiquement les éléments li de la page
        for(var e = 0; e < li.length; e++){
            li[e].parentNode.removeChild(li[e]); 
        }
    },500);
}

function finish_action(num,num2){

    // Définition d'un tableau de classes CSS associées à chaque numéro
    var class_li =['list_travail list_dsp_true', 'list_maison list_dsp_true', 'list_business list_dsp_true', 'list_sport list_dsp_true', 'list_personnel list_dsp_true'];

    // Récupération des tâches depuis le stockage local ou initialisation d'un tableau vide
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Marquer la tâche correspondante comme terminée (finished = true)
    tasks[num2].finished = true;

    // Mettre à jour les tâches dans le stockage local
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Afficher dans la console la classe CSS ciblée pour la tâche terminée
    console.log('.li_num_'+num2);

    // Modifier la classe CSS de l'élément HTML correspondant à la tâche terminée
    document.querySelector('.li_num_'+num2).className = class_li[num]+" list_finish_state";

    // Exécuter la fonction del_finish après un délai de 500 millisecondes
    setTimeout(function(){
        del_finish();
    }, 500);    
}

// Initialisation d'une variable i avec une valeur de 0
var i = 0;
function add_new(){
    // Vérifier si i est divisible par 2 (c'est-à-dire si i est pair)
    if(i % 2 == 0){
        // Si i est pair, ajoute la classe "settings_active" à l'élément avec la classe "settings"
        document.querySelector(".settings").className = "settings settings_active";

        // Ajouter la classe "add_active" à l'élément avec la classe "add"
        document.querySelector(".add").className = "add add_active";
        i++;
    } else{
        // Si i est impair, retire la classe "settings_active" de l'élément avec la classe "settings"
        document.querySelector(".settings").className = "settings";

        // Retire la classe "add_active" de l'élément avec la classe "add"
        document.querySelector(".add").className = "add";
        i++;
    }
}