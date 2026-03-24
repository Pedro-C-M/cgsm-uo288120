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

//----------------Parametros de escena, cámara y luz
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 25, 100 );
camera.lookAt(0,0,0);

const light = new THREE.PointLight( 0xffffff, 10000);
light.position.set( 0, 0, 0 );
scene.add( light );
scene.add(new THREE.AmbientLight(0x222222)); //Pa que no haya oscuridad inminente

//----------------Objetos la escena
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

//Texturas sol
const NOISEMAP = '../textures/textura_sun_noise.png';
const SUNMAP = '../textures/textura_sun.gif';
const uniforms = {
    "fogDensity": { value: 0 },
    "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
    "time": { value: 1.0 },
    "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
    "texture1": { value: textureLoader.load( NOISEMAP ) },
    "texture2": { value: textureLoader.load( SUNMAP ) }
};
uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
const vertexShader = require( '../shaders/vertex.glsl' );
const fragmentShader = require( '../shaders/fragment.glsl' );
const material = new THREE.ShaderMaterial( {
    uniforms,
    vertexShader,
    fragmentShader
} );
//Sol 
const earthOrbitGroup = new THREE.Object3D();
scene.add(earthOrbitGroup);
const sunGeometry = new THREE.SphereGeometry( 5 );
const sunMapUrl = "../textures/textura_sun.gif";
const sunMap = textureLoader.load( sunMapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
//const materialSun = new THREE.MeshBasicMaterial( { map: sunMap} );
const sun = new THREE.Mesh( sunGeometry, material );
scene.add(sun);
//----------------Grupos y posiciones

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



const sunDistance = 50;
moonGroup.position.set(sunDistance, 0, 0);
earthOrbitGroup.add(moonGroup);

//----------------Animaciones
const clock = new THREE.Clock( );
function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds
    //Rotación de la tierra
    const earthRotation = ( delta * Math.PI * 2 ) / 24;
    const earthOrbitRotation = ( delta * Math.PI * 2 ) / 240;
    earth.rotation.y += earthRotation;
    atmosphere.rotation.y += earthRotation * 0.95;
    //Órbita de la luna
    moonGroup.rotation.y += earthRotation / 4;
    //Órbita de la tierra 
    earthOrbitGroup.rotation.y += earthOrbitRotation;
    //Textura sol
    uniforms[ "time" ].value += 1 * delta;


    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};

animate();