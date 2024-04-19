const clickableArea = document.getElementById('clickableArea');
const clickList     = document.getElementById('clickList');
const buttonAction  = document.querySelectorAll('.container-button > button');
const arrayDot      = [];
const dotErased     = [];

//Storing dots in the stack data structure
class Stack
{
    constructor(dotPositionY, dotPositionX)
    {
        this.dotPositionY = dotPositionY;
        this.dotPositionX = dotPositionX;
        this.dotPosition = [ this.dotPositionY, this.dotPositionX];
    }
}

//Taking the position of the clicks, adding the Dots and passing the positions of the Dots to the Stack class
clickableArea.addEventListener('click', (e) =>
{
    const positionX = e.pageX;
    const positionY = e.pageY;

    clickList.innerHTML += 
    `<div class="dot" style= "inset: ${positionY}px ${positionX}px;"></div>`;

    arrayDot.push(new Stack(positionY, positionX));
    console.log(arrayDot);
});

//Getting button values and adding actions to them
buttonAction.forEach((btn) =>
{
    btn.addEventListener('click', (e) =>
    {
        const PressedBtnValue = e.target.value;

        switch (PressedBtnValue)
        {
            case 'undo':
                if(arrayDot.length === 0) return;

                dotErased.push(new Stack(arrayDot[arrayDot.length - 1].dotPositionY, arrayDot[arrayDot.length - 1].dotPositionX));
                

                arrayDot.pop([arrayDot.length -1]);
                
                console.log(arrayDot);
                console.log(dotErased);

                document.querySelector('#clickList > *:last-child')?.remove();
                break;

            case 'return':
                if(dotErased.length === 0) return;

                clickList.innerHTML += 
                `<div class="dot" style= "inset: ${dotErased[dotErased.length -1].dotPositionY}px ${dotErased[dotErased.length -1].dotPositionX}px;"></div>`;

                arrayDot.push(dotErased[dotErased.length -1]);
                dotErased.pop(dotErased[dotErased.length -1]);

                console.log(arrayDot);
                console.log(dotErased);
                break;

            case 'reset':
                document.querySelectorAll('#clickList > .dot').forEach(e => e.remove());
                while(arrayDot.length) arrayDot.pop();
                while(dotErased.length) dotErased.pop();
                break;
        }
    });
});