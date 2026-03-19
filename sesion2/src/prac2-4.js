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

//Tierra
const earthGeometry = new THREE.SphereGeometry( 100 );

const mapUrlEarth = "../textures/textura_earth.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const mapEarth = textureLoader.load( mapUrlEarth, 
    ( loaded ) => { renderer.render( scene, camera ); });
const earthMaterial = new THREE.MeshPhongMaterial( { map: mapEarth } );

const earth = new THREE.Mesh( earthGeometry, earthMaterial );
//Atmosfera
const atmosphereGeometry = new THREE.SphereGeometry( 101 );

const mapUrlAtmosphere = "../textures/textura_cloud.png";   // The file used as texture
const mapAtmosphere = textureLoader.load( mapUrlAtmosphere, 
    ( loaded ) => { renderer.render( scene, camera ); });
const atmospherehMaterial = new THREE.MeshLambertMaterial( {
     map: mapAtmosphere,
     transparent: true, //Activa canal alfa
     opacity: 0.5, //Transparencia
     side: THREE.DoubleSide
     //color: 0xFFFFFF
    } );
const atmosphere = new THREE.Mesh( atmosphereGeometry, atmospherehMaterial );
//Grupo de la tierra
const earthGroup = new THREE.Object3D();
earthGroup.add(earth);
earthGroup.add(atmosphere);

earthGroup.rotation.z = 0.36; 

scene.add(earthGroup);

renderer.render( scene, camera );