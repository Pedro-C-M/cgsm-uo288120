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
camera.position.set( 0, 0, 10 );

const light = new THREE.PointLight( 0xffffff, 100000);
light.position.set( 0, 100, 200 );
scene.add( light );

//Tierra
const earthGeometry = new THREE.SphereGeometry( 1 );

const mapUrlEarth = "../textures/textura_earth.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const mapEarth = textureLoader.load( mapUrlEarth, 
    ( loaded ) => { renderer.render( scene, camera ); });
const earthMaterial = new THREE.MeshPhongMaterial( { map: mapEarth } );

const earth = new THREE.Mesh( earthGeometry, earthMaterial );
//Atmosfera
const atmosphereGeometry = new THREE.SphereGeometry( 1.01 );

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

//Luna
const moonGeometry = new THREE.SphereGeometry( 0.27 );

const moonMapUrl = "../textures/textura_moon.gif";
const moonMap = textureLoader.load( moonMapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const materialMoon = new THREE.MeshLambertMaterial( { map: moonMap, color: 0x888888 } );

const moon = new THREE.Mesh( moonGeometry, materialMoon );

const distance = 20;
moon.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );

// Rotate the Moon to face visible side to the Earth (tidal locking)
moon.rotation.y = Math.PI;

//Grupo de la tierra
const earthGroup = new THREE.Object3D();
earthGroup.add(earth);
earthGroup.add(atmosphere);

earthGroup.rotation.z = 0.36; 

scene.add(earthGroup);

//Grupo luna-tierra
const moonGroup = new THREE.Object3D( );
moonGroup.add( moon );
moonGroup.add( earthGroup );
// The Moon orbit is a bit tilted
moonGroup.rotation.x = 0.089;
scene.add( moonGroup );

const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds
    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 24;
    earth.rotation.y += rotation;
    atmosphere.rotation.y += rotation * 0.95;
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};

animate();