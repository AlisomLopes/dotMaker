const clickableArea = document.getElementById('clickableArea');
const listaDeClicks = document.getElementById('listaDeClicks');
const buttonAction = document.querySelectorAll('.container-button > button');
const arrayDot = [];
var dotApagados = [];

//Armazenando as dot na estrutura de dados pilha
class Pilha
{
    constructor(dotPositionX, dotPositionY)
    {
        this.dotPositionX = dotPositionX;
        this.dotPositionY = dotPositionY;
        this.dotPosition = [this.dotPositionX, this.dotPositionY];
    }
}

/*
Pegando a posição dos clicks, adicionando os Dots e passando as posições dos Dots para 
a class Pilha
*/
clickableArea.addEventListener('click', (e) =>
{
    const positionX = e.pageX;
    const positionY = e.pageY;

    listaDeClicks.innerHTML += 
    `<div class="dot" style= "inset: ${positionY}px ${positionX}px;"></div>`;

    arrayDot.push(new Pilha(positionX, positionY));
    console.log(arrayDot);
});

/* 
Pegando os valores dos botões e adicionando ações a eles
*/
buttonAction.forEach((btn) =>
{
    btn.addEventListener('click', (e) =>
    {
        const value = e.target.innerText;

        switch (value)
        {
            case 'undo':
                if(arrayDot.length === 0) return;

                dotApagados.push(new Pilha(arrayDot[arrayDot.length - 1].dotPositionX, arrayDot[arrayDot.length - 1].dotPositionY));
                console.log(dotApagados);

                arrayDot.pop([arrayDot.length -1]);
                console.log(arrayDot);

                document.querySelector('#listaDeClicks > *:last-child')?.remove();
                break;

            case 'return':
                if(dotApagados.length === 0) return;

                listaDeClicks.innerHTML += 
                `<div class="dot" style= "inset: ${dotApagados[dotApagados.length -1].dotPositionY}px ${dotApagados[dotApagados.length -1].dotPositionX}px;"></div>`;

                arrayDot.push(dotApagados[0]);
                console.log(arrayDot);

                dotApagados.pop(dotApagados[0]);
                console.log(dotApagados);
                break;

            case 'reset':
                document.querySelectorAll('#listaDeClicks > .dot').forEach(e => e.remove());
                while(arrayDot.length) arrayDot.pop();
                while(dotApagados.length) dotApagados.pop();
                break;
        }
    });
});

//<div class="dot" style= "inset: ${positionY}px ${positionX}px;"></div>
/*
    Pegar o evento e cordenadas do click do usuario; ✅
    Adicionar um Dot na posição onde foi clicado; ✅
    Anotar a posição do Dot em uma ED de pilha; ✅
    Adicionar o evento de apagar o ultimo Dot apagado quando o
usuario clicar no button undo; ✅
    Adicionar o evento de recuperar o(s) ultimo(s) Dot(s) quando o
usuario clicar no button return; ✅
    Adicionar o evento de apagar todos os Dots quando o
usuario clicar no button reset; ✅
*/