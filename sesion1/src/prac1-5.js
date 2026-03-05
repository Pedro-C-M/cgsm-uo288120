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

const geometry = new THREE.BufferGeometry();

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

geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );

renderer.render( scene, camera );