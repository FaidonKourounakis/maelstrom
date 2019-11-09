
{
    let burger = document.querySelector('.header__burger');

    let showMenu = () => {
        let top = document.querySelector('.header__burger--top');
        let middle = document.querySelector('.header__burger--middle');
        let bottom = document.querySelector('.header__burger--bottom');

        
        top.classList.toggle('cross')
        middle.classList.toggle('cross')
        bottom.classList.toggle('cross')

        console.log(top )
    }


    burger.addEventListener('click', showMenu);

}