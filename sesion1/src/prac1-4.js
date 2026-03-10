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

const contenedor = document.getElementById('prac4');

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( contenedor.clientWidth, contenedor.clientHeight );
contenedor.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const geometry = new THREE.BoxGeometry( 50, 50, 50 );
const material = new THREE.MeshBasicMaterial( );
const box = new THREE.Mesh( geometry, material );

box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

const sphereGeometry = new THREE.SphereGeometry( 30, 32, 16 );
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000} ); // Rojo
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

// Desplazamos la esfera hacia la izquierda en el eje X
sphere.position.set( -70, 0, 0 );
scene.add( sphere );

const cylinderGeometry = new THREE.CylinderGeometry( 20, 20, 60, 32 );
const cylinderMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } ); // Azul
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

// Desplazar derecha X
cylinder.position.set( 70, 0, 0 );
cylinder.rotation.set( Math.PI / 6, 0, 0 ); 
scene.add( cylinder );



scene.add( box );
scene.add( cylinder );
scene.add( sphere );
renderer.render( scene, camera );