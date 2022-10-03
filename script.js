const data = Array.from({length: 100})
    .map((_, i) => `Item ${(i + 1)}`)


// function populateList(){
//     const data = Array.from({length: 100})
//     .map((_, i) => `<div class='item'>Item ${(i + 1)}</div>`)

//     const list = document.querySelector('#paginate .list');
//     list.innerHTML = data.join("");
    

//     return data;
// }
// const data = populateList();

//ESTADO DA APLICAÇAO

let perPage = 5;
const state = {
    // SABER EM QUE PAGINA ESTÁ
    page: 1, 
    
    //DEFININDO A QTD DE ITENS POR PÁGINA
    perPage,
    
    //QUANTAS PAGINAS TEREI NO FINAL, ATRAVES O RETURN DATA
    totalPage: Math.ceil(data.length / perPage) ,

    //QTD DE BOTOES VISIVEIS 
    maxVisibleButtons: 5
}

//FUNÇAO AUXILIAR - CAPTURA DOS ELEMENTOS
const html = {
    get(element){
        return document.querySelector(element)
    }
}

//CONFIGURANDO CONTROLES DE PAGINAS
const controls = {

    //INDO PARA PROXIMA PAGINA
    next() {
        state.page++

        //LOGICA1: SE O TOTAL DE PAGINAS FOR MAIOR QUE O STATE.PAGE É PQ JA PASSAMOS DA ULTIMA PAGINAS (OU SEJA SE JA ESTIVERMOS NA ULTIMA PAGINA NAO DA PRA IR ALÉM DELA)
        const lastPage = state.page > state.totalPage;
        if(lastPage){
            // LOGICA1.1: ENTAO VAMOS VOLTAR A ULTIMA
            state.page--
        }
    },
    //RETORNANDO 1 PÁGINA
    prev() {
        state.page--

        //LOGICA: SE A PAGE FOR MENOR QUE UM (QUE É A PRIMEIRA PAGE), PRECISAMOS PERMANECER NA PRIMEIRA JA Q NAO ESTAMOS NA PAG INICIAL
        if(state.page < 1){
            state.page++
        }
    },
    //INDO PARA PRIMEIRA OU ULTIMA PAGINA
    //RECEBE A PAGINA QUE QUERO IR
    goTo(page) {

        //NAO ACEITAR NUMEROS NEGATIVOS
        if(page < 1){
            page = 1;
        }
        //SETAR O STATE.PAGE COMO A PAGINA Q QUERO IR
        state.page = page;

        //SE A ULTIMA PAGINA ESCOLHIDA FOR MAIOR Q O TOTAL DE PAGINAS, O TOTAL DE PAGINAS RECE TOTALPAGE
        if(page > state.totalPage){
            state.page = state.totalPage
        }
    },
    //CRIANDO OS CONTROLES
    createListeners(){
        //PRIMEIRA PAGINA
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update() //TODA VEZ Q CLICAR VAI ATUALIZAR A PAGINA
        })
        //ULTIMA PAGINA
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update() //TODA VEZ Q CLICAR VAI ATUALIZAR A PAGINA
        })
        //PROXIMA PAGINA
        html.get('.next').addEventListener('click', () => {
            controls.next()
            update() //TODA VEZ Q CLICAR VAI ATUALIZAR A PAGINA
        })
        //PAGINA ANTERIOR
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update() //TODA VEZ Q CLICAR VAI ATUALIZAR A PAGINA
        })
    }
}
//FUNÇAO AUXILIAR - ATUALIZANDO A PAGINA
function update(){
    console.log(state.page)
}

//LISTA DOS ITENS POR PAGINA
const list = {
    //CRIANDO OS ELEMENTOS DA LISTA
    create(item){
        // console.log(item)
        const div = document.createElement('div');
        div.classList.add('item')
        div.innerHTML = item

        html.get('.list').appendChild(div)
    },

    //REALIZANDO UPDATE DA LISTA - IRÁ RODAR SEMPRE Q CLICAR NOS BOTOES E NO INICIO DA PP
    update() {
        html.get('.list').innerHTML = ""; //A LISTA DE ITENS COMEÇA ZERADA
        let page = state.page - 1;

        //PEGANDO A QUANTIDADE INICIAL DE ITENS POR PAGINA([0])
        let start = page * state.perPage

        //PEGANDO A QUANTIDADE FINAL DE ITENS POR PAGINA([5])
        let end = start + state.perPage

        //SEPARADO A QUANTIDADE DE ITENS POR PAGINA(5 itens por pagina)
        const paginatedItems = data.slice(start, end)

        //CRIANDO OS ELEMENTOS PARA CADA ITEM
        paginatedItems.forEach(list.create)
    }
}


const buttons = {
    create() {},
    update() {
        html.get('.pagination .numbers').innerHTML = ""; //ZERANDO OS BOTÕES
        const {maxLeft, maxRight} = buttons.calculateMaxVisible()

        console.log(maxLeft, maxRight)
        //ENQUANTO O PAGE FOR MENOR Q O MAXRIGHT, ADICIONE UMA PAGINA
        // for(let page = maxLeft; page <= maxRight; page++) {

        // }
    },
    //O MAXIMO DE BOTOES VISIVEIS
    calculateMaxVisible(){
        const {maxVisibleButtons} = state //TIRANDO A VARIAVEL DO OBJ STATE PATA TRABALHAR COM ELE

        //O MAXIMO DE BOTOES A ESQUERDA
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        //O MAXIMO DE BOTOES A DIREITA
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if (maxLeft < 1){
            maxLeft = 1;
            maxRight = maxVisibleButtons;
        }

        if(maxRight > state.totalPage){
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage
        }

        return{maxLeft, maxRight}
    }
};

//ATUALIZANDO OS ITENS POR PÁGINA
function update(){
    list.update()
    buttons.update()
}

//INICIO DA APLICAÇAO
function init(){
    //CHAMANDO OS CONTROLES
    update()
    controls.createListeners()
}

init()



