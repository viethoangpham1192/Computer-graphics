import * as THREE from './js/three.module.js';
import { GLTFLoader } from './js/GLTFLoader.js';
import { OrbitControls } from './js/OrbitControls.js';
import { PointerLockControls } from './js/PointerLockControls.js';

let showInfo = false;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let raycaster = [];
let raycasterMouse;
var objects = [];

const nrays = 80;
const leftmost = 10;
const rightmost = 40;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();
const mouse = new THREE.Vector2();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.add(camera1)
scene.background = new THREE.Color(0xcce0ff);
scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();
scene.add(new THREE.AmbientLight(0xffffff));
const controls = new PointerLockControls(camera, renderer.domElement);
controls.minPolarAngle = 1;
controls.maxPolarAngle = 1;
scene.add(controls.getObject());
const loader = new GLTFLoader();
loader.load(
    './ho.glb', function (gltf) {
        const models = gltf.scene;
        models.traverse((child) => {
            objects.push(child);
        })
        scene.add(models);
        animate();
    }, undefined, undefined
);



camera.position.z = 3;
camera.position.y = 1.5;
camera.position.x = -8;
const onKeyDown = function (event) {

    switch (event.keyCode) {
        case 73:
            showInfo = true;
            // controls.lock();
            break;
        case 79:
            showInfo = false;
            // controls.unlock();
            break;
        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 37: // left
        case 65: // a
            moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            moveRight = true;
            break;

        case 32: // space
            if (canJump === true) velocity.y += 2;
            canJump = false;
            break;

    }

};

const onKeyUp = function (event) {

    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 37: // left
        case 65: // a
            moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            moveRight = false;
            break;

    }

};
document.addEventListener('click', function () { controls.lock() }, false);
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    mouse.x = (event.clientX / document.body.clientWidth) * 2 - 1;
    mouse.y = (event.clientY / document.body.clientHeight) * 2 + 1;
}, false)

//hinh anh cho mat dat
var groundTexture = new THREE.TextureLoader().load('grass1.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10000, 10000);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;
var groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });

var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), groundMaterial);
mesh.position.y = 0.0;
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

//hinh anh cho bau troi




// for(let i = leftmost; i < rightmost; ++i) {
//     let x = Math.cos(360/nrays*i*Math.PI/180);
//     let z = Math.sin(360/nrays*i*Math.PI/180);
//     raycaster[i] = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(z, 0, x), 0, 1);
// }

// raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 1);
raycasterMouse = new THREE.Raycaster();


// controls.lock();

function animate() {
    requestAnimationFrame(animate);
    // if (!controls.isLocked) {
    // camera1.rotation.copy(camera.rotation);
    // camera1.position.copy(camera.position);
    //console.log(camera.rotation);
    // camera1.rotation.y = 0;
    // camera1.position.y = 0.5;

    raycasterMouse.setFromCamera(new THREE.Vector2(0, 0), camera);
    const objectRays = raycasterMouse.intersectObjects(objects);
    var obj1;
    if (showInfo == false) {
        // controls.unlock();
        document.getElementById("info").style.display = "none";
        document.getElementById("liet__si").style.display = "none";
        document.getElementById("le_thanh_tong").style.display = "none";
        document.getElementById("dong_duong_trencao").style.display = "none";
        document.getElementById("dong_duong").style.display = "none";
        document.getElementById("xuan_thuy").style.display = "none";
        document.getElementById("19le_thanh_tong").style.display = "none";
        document.getElementById("sodo_xuanthuy").style.display = "none";
        document.getElementById("sodo_thanhxuan").style.display = "none";
        document.getElementById("sodo_luongthevinh").style.display = "none";
        document.getElementById("ktx_mydinh").style.display = "none";
        document.getElementById("ban1").style.display = "none";
        document.getElementById("ban2").style.display = "none";
        document.getElementById("ban3").style.display = "none";
        document.getElementById("ban4").style.display = "none";
        document.getElementById("anh1").style.display = "none";
        document.getElementById("anh2").style.display = "none";
        document.getElementById("anh3").style.display = "none";
        document.getElementById("anh4").style.display = "none";
        document.getElementById("anh5").style.display = "none";
        document.getElementById("anh6").style.display = "none";
        document.getElementById("anh7").style.display = "none";
        document.getElementById("anh8").style.display = "none";
    }
    if (objectRays.length > 0) {
        var obj1 = objectRays[0];
        // console.log(obj1.distance);
        // console.log(objectRays.length);
    }
    if (objectRays.length > 0) {
        // console.log('name: ' + obj1.object.userData.name);
        let raycastTargetName = obj1.object.name;
        console.log('name: ' + raycastTargetName);
        // if (showInfo == true && name == 'To') {
        if (obj1.distance <= 1.3) {
            // controls.lock();
            // TODO: check if raycastTargetName is interactable
            // if (isAiming)
            // {
            if (raycastTargetName == 'Torus.013_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("liet__si").style.display = "flex";
            } else if (raycastTargetName == 'Torus.012_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("le_thanh_tong").style.display = "flex";
            } else if (raycastTargetName == 'Torus.019_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("dong_duong_trencao").style.display = "flex";
            } else if (raycastTargetName == 'Torus.018_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("dong_duong").style.display = "flex";
            } else if (raycastTargetName == 'Torus.002_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("xuan_thuy").style.display = "flex";
            } else if (raycastTargetName == 'Torus.001_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("19le_thanh_tong").style.display = "flex";
            } else if (raycastTargetName == 'Plane.018_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("ban1").style.display = "flex";
            } else if (raycastTargetName == 'Torus.016_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("sodo_xuanthuy").style.display = "flex";
            } else if (raycastTargetName == 'Torus.017_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("sodo_thanhxuan").style.display = "flex";
            } else if (raycastTargetName == 'Torus.023_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("ktx_mydinh").style.display = "flex";
            } else if (raycastTargetName == 'Torus.022_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("sodo_luongthevinh").style.display = "flex";
            }
            else if (raycastTargetName == 'Plane.007_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("ban2").style.display = "flex";
            } else if (raycastTargetName == 'Plane.027_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("ban3").style.display = "flex";
            }
            else if (raycastTargetName == 'Plane.019_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("ban4").style.display = "flex";
            }else if (raycastTargetName == 'Torus.025_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh1").style.display = "flex";
            } else if (raycastTargetName == 'Torus.024_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh2").style.display = "flex";
            } else if (raycastTargetName == 'Torus.003_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh3").style.display = "flex";
            } else if (raycastTargetName == 'Torus.014_2') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh4").style.display = "flex";
            } else if (raycastTargetName == 'Plane.001_0') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh5").style.display = "flex";
            } else if (raycastTargetName == 'Torus.008_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh6").style.display = "flex";
            } else if (raycastTargetName == 'Torus.005_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh7").style.display = "flex";
            } else if (raycastTargetName == 'Torus.006_1') {
                document.getElementById("info").style.display = "flex";
                document.getElementById("anh8").style.display = "flex";
            }
            // document.getElementById("info-image").src = models[raycastTargetName].img;



            // Thay Hello tương ứng với object, dựa vào raycastTargetName
            // Ví dụ bấm vào ảnh thầy thì hiện thông tin thầy
            // document.getElementById("info-text").innerHTML = raycastTargetName;






            // }
        }
        // console.log("Name2: " +  JSON.stringify(objectRays[0]["object"]));
        // console.log("Name3: " +  JSON.stringify(objectRays[0]["object"]["object"]["name"]));
    }
    if (controls.isLocked === true) {
        // raycaster.ray.origin.copy(controls.getObject().position);
        // raycaster.ray.origin.y -= 1;
        // let onObject = false;
        // for(let i = leftmost; i < rightmost; ++i) {
        //     raycaster[i].ray.origin.copy(controls.getObject().position);
        //     raycaster[i].ray.origin.y -= 1;
        //     const intersections = raycaster[i].intersectObjects(objects);
        //     onObject |= intersections.length > 0;
        // }

        const delta = clock.getDelta();

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward) {
            if (obj1 === undefined || obj1.distance > 1.3) velocity.z -= direction.z * 40.0 * delta;
        }
        if (moveBackward) velocity.z -= direction.z * 40.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 40.0 * delta;

        controls.moveRight(- velocity.x * delta);
        controls.moveForward(- velocity.z * delta);
        console.log("DM", camera.position.x, camera.position.y, camera.position.z, camera.rotation);
        // if(onObject) controls.moveForward( 5 * velocity.z * delta );

        // if(onObject === true){
        //     velocity.z = Math.max( 0, velocity.z );
        // }

        controls.getObject().position.y += (velocity.y * delta); // new behavior

        if (controls.getObject().position.y < 1) {

            velocity.y = 0;
            controls.getObject().position.y = 1;

            canJump = true;

        }

    }

    renderer.render(scene, camera);
}