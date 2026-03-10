import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGL2Available() ) {
    // WebGL is available
    console.log("Esta disponible")
}

//Redimensionamiento
window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );

const contenedor = document.getElementById('prac5');

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( contenedor.clientWidth, contenedor.clientHeight );
contenedor.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const geometry = new THREE.BufferGeometry();


const vertices = new Float32Array( [
    // Internal vertices
    -20, -20,  0,//0 CASA ABJ,IZDA
     20, -20,  0,//1 CASA ABJ,DERE
     20,  10,  0,//2 CASA ARR,DERE
    -20,  10,  0,//3 CASA ARR,IZDA
      0,  30,  0,//4 PUNTA DEL TEJADO
     -5, -20,  0,//5 PUERTA IZDA ABJ
      5, -20,  0,//6 PUERTA DERE ABJ
     -5, -10,  0,//7 PUERTA IZDA ARR
      5, -10,  0,//8 PUERTA DERE ARR
    -10,  10,  0,//9 VENTANA 1 ARR IDZ
     -5,  10,  0,//10 VENTANA 1 ARR DERE
    -10,   5,  0,//11 VENTANA 1 ABJ IDZ
     -5,   5,  0,//12 VENTANA 1 ABJ DERE
      5,  10,  0,//13 VENTANA 2 ARR IDZ
     10,  10,  0,//14 VENTANA 2 ARR DERE
      5,   5,  0,//15 VENTANA 2 ABJ IDZ
     10,   5,  0//16 VENTANA 2 ABJ DERE
] );

// Faces (indices of vertices)
const indices = [
    0,5,7,
    1,8,6,
    0,11,3,
    0,7,11,
    3,11,9,
    7,12,11,
    12,13,10,
    12,15,13,
    1,2,8,
    8,2,16,
    8,16,15,
    16,2,14,
    7,15,12,
    7,8,15,
    3,2,4
];

geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const mesh = new THREE.Mesh( geometry, material );
mesh.scale.set( 2, 2, 2 );

scene.add( mesh );

renderer.render( scene, camera );