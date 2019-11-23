/*
DOCUMENTATION:
when creating a parallax picture be sure to 
    1. give it the parallax attribute
        e.g. parallax="{ speed: 0.5, src: '../../assets/img/1.jpg' }" 
*/


// // 1.gets all elements with the 'parallax' attribute,
// // 2.turns the nodeList to an array
// let targets = Array.from( document.querySelectorAll( '[parallax]' ) )


// // 3. inserts the parallax styles in the sheets:
// // let style = document.getElementsByTagName( 'style' )
// // style.innerHTML = `
// const style = `
//     <style>
//     .parallax { 
//         background-size: cover;
//         background-position: center;
//         z-index: -100;
//         height: 100vh;
//     }
//     </style>
// `
// // console.log(document.queryS( 'body' ))
// document.querySelector( 'body' ).innerHTML = style + document.querySelector( 'body' ).innerHTML

// // 4. adds the class parallax to the targets
// targets.forEach( target => {
//     target.classList.toggle( 'parallax' )
//     console.log(target)
// })

// // 5.maps an array with objects containing the target element, 
// // speed of the parallax, and the src of the image, 
// // relative to this parallax.js
// targets = targets.map( target => (
//     { 
//         target, 
//         speed: target.attributes.parallax.value,
//         position: target.getBoundingClientRect().y,
//         height: window.getComputedStyle( target ).height,
//         src: target.attributes[ 'bg-img' ].value
//     }
// ))
// console.log( targets )



// window.addEventListener( 'scroll', e => {

//     let scrolled = window.pageYoffset
//     console.log( targets )
//     // for ( target of targets ) {
//     //     target.style.transform = `translate3d(  )`
//     // }

// })