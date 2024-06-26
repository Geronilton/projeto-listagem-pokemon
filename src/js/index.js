/*
    O que precisamos fazer? - quando clicarmos no botão de troca de tema temos que alterar a cor do tema da página para as cores do tema claro ou do tema escuro

    - objetivo 1 - quando clicar no botão de troca de tema, adicionar a classe modo-escuro no body pra que os estilos do modo escuro sejam aplicados e mudar a imagem pra lua
        - passo 1 - pegar no JS o elemento HTML correspondente ao botão de troca de tema
        - passo 2 - dar um jeito de pegar no JS o elemento HTML corresponde ao body
        - passo 3 - dar um jeito de identificar o clique do usuário no botão de troca de tema
        - passo 4 - adicionar a classe modo-escuro no body
        - passo 5 - trocar a imagem do botão de alterar tema pra lua
    
    - objetivo 2 - quando clicar no botão de troca de tema, caso o body já tenha a classe modo-escuro, remover a classe pra mudar pro modo claro e mudar a imagem pro sol
        - passo 6 - verificar se tem a classe modo escuro
        - passo 7 - remover a classe do modo-escuro do body
        - passo 8 - trocar a imagem do botão de alterar tema pra sol
*/


//  passo 1 - pegar no JS o elemento HTML 
// correspondente ao botão de troca de tema
const botaoAlterarTema = document.getElementById("botao-alterar-tema");
const body = document.querySelector("body");
const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");

botaoAlterarTema.addEventListener("click",() => {

    const modoEscuroEstaAtivo = 
    body.classList.contains("modo-escuro");
    body.classList.toggle("modo-escuro");

    if (modoEscuroEstaAtivo){
        imagemBotaoTrocaDeTema.setAttribute("src","./src/imagens/sun.png");
    }else{
        imagemBotaoTrocaDeTema.setAttribute("src","./src/imagens/moon.png");
    }
});



// Pesquisa de pokemon

const cardSearched = document.querySelector(".cardSearched");
const pokeName = document.querySelector(".name");
const imgPok = document.querySelector(".imgPokemon");
const tipo = document.querySelector(".tipo1");
const tipo1 = document.querySelector(".tipo2");
const id = document.querySelector(".id");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const buttonPre = document.querySelector(".pre");
const buttonNext = document.querySelector(".next");

let InicialPokemon = 1;
const buscarPokemon = async (pokemon) => {
    const responseApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   if (responseApi.status === 200){
    const data = await responseApi.json();
    console.log(data);
    return data;
   };
};

const renderPokemon = async (pokemon) => {
    const data = await buscarPokemon(pokemon);

    pokeName.innerHTML = data.name ;
    id.innerHTML = `# ${data.id}`;
    imgPok.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    tipo.innerHTML = data.types[0]['type']['name'];
    InicialPokemon = data.id;

    if (data.types.length > 1){
        tipo1.innerHTML = data.types[1].type.name;
        tipo1.style.display = "inline";
    }else{
        tipo1.innerHTML = "";
        tipo1.style.display = "none";
    }
    
};



form.addEventListener("submit", (event)=>{
    cardSearched.style.display = "inline";
    event.preventDefault();
    const pokemon = input.value;
    renderPokemon(pokemon.toLowerCase())
});

buttonPre.addEventListener("click", ()=>{
    if (InicialPokemon > 1) {
        InicialPokemon -= 1;
        renderPokemon(InicialPokemon);
    }
})

buttonNext.addEventListener("click", () => {
    InicialPokemon += 1;
    renderPokemon(InicialPokemon);
});
