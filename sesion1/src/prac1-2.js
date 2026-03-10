import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGL2Available() ) {
    // WebGL is available
    console.log("Está disponible")
}

const contenedor = document.getElementById('prac2');

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( contenedor.clientWidth, contenedor.clientHeight );
contenedor.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const material = new THREE.MeshBasicMaterial( );
const box = new THREE.Mesh( geometry, material );


scene.add( box );
renderer.render( scene, camera );