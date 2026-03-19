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

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const light = new THREE.PointLight( 0xffffff, 100000);
light.position.set( 0, 100, 200 );
scene.add( light );

const geometry = new THREE.SphereGeometry( 100 );

const mapUrl = "../textures/textura_earth.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl, 
    ( loaded ) => { renderer.render( scene, camera ); });
const material = new THREE.MeshPhongMaterial( { map: map } );


const box = new THREE.Mesh( geometry, material );

box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

scene.add( box );
renderer.render( scene, camera );