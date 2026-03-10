import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGL2Available() ) {
    // WebGL is available
    console.log("Esta disponible")
}

//-------Redimensionamiento-------
window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );

//-------Escena y renderer-------
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xaaaaaa );
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//-------Cámara-------
const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

//-------Luz-------
///**
const light = new THREE.PointLight( 0xffffff, 100000);
light.position.set( 0, 100, 200 );
scene.add( light );
//*/
//Pruebo con los otros tipos de luz
/** 
const light = new THREE.AmbientLight(0xffffff);
scene.add( light );
*/
/** 
const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( light );
*/

//-------Objetos-------
const geometry = new THREE.BoxGeometry( 50, 50, 50 );
const material = new THREE.MeshBasicMaterial( );
const box = new THREE.Mesh( geometry, material );

box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

const sphereGeometry = new THREE.SphereGeometry( 30, 32, 16 );
const sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000} ); // Rojo
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

// Desplazamos la esfera hacia la izquierda en el eje X
sphere.position.set( -70, 0, 0 );

const cylinderGeometry = new THREE.CylinderGeometry( 20, 20, 60, 32 );
const cylinderMaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff } ); // Azul
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

// Desplazar derecha X
cylinder.position.set( 70, 0, 0 );
cylinder.rotation.set( Math.PI / 6, 0, 0 ); 

const casaGeometry = new THREE.BufferGeometry();

const inner = 20;
const outer = 40;

const vertices = new Float32Array( [
    // Internal vertices
    -20, -20,  0,
     20, -20,  0, 
     20,  10,  0, 
    -20,  10,  0, 
      0,  30,  0
] );

// Faces (indices of vertices)
const indices = [
    0,1,2,
    0,2,3,
    3,2,4
];

casaGeometry.setIndex( indices );
casaGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const casa = new THREE.Mesh( casaGeometry, material1 );

casa.position.set(0, 70, 0);


scene.add( casa );
scene.add( box );
scene.add( cylinder );
scene.add( sphere );

renderer.render( scene, camera );