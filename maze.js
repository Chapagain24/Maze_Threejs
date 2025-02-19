//by AKSHYAT CHAPAGAIN
//STUDENT NUMBER: 219613380

import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Define variables
var scene, camera, renderer;
var sphere, maze, sphereSpeed = 0.3;
var walls = [];
var directionVector = new THREE.Vector3(0, 0, 0);
var isFirstPerson = false; // Declare isFirstPerson here
var cameraRotationY = 0;

// Load texture
var textureLoader = new THREE.TextureLoader();
var wallTexture = textureLoader.load('./wall1.jpg');
var vineTexture = textureLoader.load('./wall2.webp'); // Path to your vine texture image

// Initialize Three.js scene
function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 14, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    //renderer = new THREE.WebGLRenderer({ antialias : false });
    renderer = new THREE.WebGLRenderer({ antialias : false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


/////////event listeners/////////
    // Add event listener for window resize
    window.addEventListener('resize', onWindowResize, false);
    // Movement controls
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
///////////////////////////////////

   // Movement controls
   document.addEventListener('keydown', onKeyDown);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(10, 50, 'red', 'white');
   // scene.add(gridHelper);

    // Orbit controls
    const orbit = new OrbitControls(camera, renderer.domElement);
  

    // Lights for better visibility
    var ambientLight = new THREE.AmbientLight(0x404040,1);
    scene.add(ambientLight);
    // Set the scene background to a sky blue color
    scene.background = new THREE.Color("#0A2A3A");
 

    //add floor
    createFloor();

    // Sphere setup
    var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(10, 1, 8); // Start position of the sphere
    scene.add(sphere);

    createMaze();

  
    // Render the scene
    render();
    

}

function createMaze() {
      // Create Maze Structure
      var wallGeometry = new THREE.BoxGeometry(1, 2, 1,1,1,1);
      var wallMaterial = new THREE.MeshStandardMaterial( { map: wallTexture } );
      var vineMaterial = new THREE.MeshStandardMaterial({ map: vineTexture });
      
       maze = [
          [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
          [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ];
      var offsetX = (maze[0].length - 1) / 2; // Calculate offset in X direction
      var offsetZ = (maze.length - 1) / 2;    // Calculate offset in Z direction
  
      for (var i = 0; i < maze.length; i++) {
          for (var j = 0; j < maze[i].length; j++) {
              if (maze[i][j] === 1) {
                // Choose the material randomly or based on some criteria
                var useVineMaterial = Math.random() > 0.7; // 30% chance to use vine material
                var material = useVineMaterial ? vineMaterial : wallMaterial;

                  var wall = new THREE.Mesh(wallGeometry, material);
                  wall.position.set((j - offsetX) * 1, 0, (i - offsetZ) * 1); // Adjust position
                  scene.add(wall);
                  walls.push(wall);
                  
              }
          }
      }
      // Load GLB model
      var loader = new GLTFLoader();
      loader.load(
          './torchlowpoly.glb',
          function (gltf) {
              // Once loaded, position and add the model to the scene
               var model = gltf.scene;
              model.position.set(10, 1, 8); // Adjust position if needed
              //model.scale.setScalar(5);
              model.visible=true;
             // scene.add(model);
              // Iterate through walls array to add torches on each wall
              walls.forEach(function(wall, index) {
                  addTorchOnWall(wall, index % maze.length, index % maze[0].length, maze, model);
                
              });
          
          },
          undefined,
          function (error) {
              console.error('Error loading GLB model', error);
          }
      );
      loader.load(
          './rock.glb',
          function (gltf) {
              // Once loaded, position and add the model to the scene
               var model = gltf.scene;
              model.position.set(7, 0, -5); // Adjust position if needed
              model.scale.setScalar(0.3);
              model.visible=true;
              scene.add(model);
          },
          undefined,
          function (error) {
              console.error('Error loading GLB model', error);
          }
      );
      loader.load(
        './gargoyle.glb',
        function (gltf) {
            // Once loaded, position and add the model to the scene
             var model = gltf.scene;
            model.position.set(9.8, 1.3, 9); // Adjust position if needed
            model.scale.setScalar(2)
            model.visible=true;
            model.rotation.y = Math.PI / 2;
            scene.add(model);
        },
        undefined,
        function (error) {
            console.error('Error loading GLB model', error);
        }
    );
    
}


function createFloor() {
    var geometry = new THREE.PlaneGeometry(30, 30, 4, 6);
  
    // Create material
    var material = new THREE.MeshStandardMaterial({ map: wallTexture, flatShading: false, side: THREE.DoubleSide });
  
    // Create terrain mesh
    var terrain = new THREE.Mesh(geometry, material);
  
    terrain.rotation.x = -Math.PI / 2; // Rotate the terrain to make it horizontal
    terrain.position.y=0.0;
    scene.add(terrain);
  }

function addTorchOnWall(wall, i, j, maze, model) {
    // Check if the current cell is a wall
    if (maze[i][j] === 1) {
         // Check if the current cell is a corner or a turn
         if ((i > 0 && j > 0 && maze[i - 1][j] === 0 && maze[i][j - 1] === 0) ||
         (i > 0 && j < maze[i].length - 1 && maze[i - 1][j] === 0 && maze[i][j + 1] === 0) ||
         (i < maze.length - 1 && j > 0 && maze[i + 1][j] === 0 && maze[i][j - 1] === 0) ||
         (i < maze.length - 1 && j < maze[i].length - 1 && maze[i + 1][j] === 0 && maze[i][j + 1] === 0)) {
     

            // Calculate position based on the side of the wall
            var offsetX = (maze[0].length - 1) / 2; // Calculate offset in X direction
            var offsetZ = (maze.length - 1) / 2;    // Calculate offset in Z direction
            var torchPosition = new THREE.Vector3(
                (j - offsetX) * 1 + (j === 0 ? -0.5 : 0.5), // Adjust position based on wall side
                0.75, // Adjust height as needed
                (i - offsetZ) * 1
            );

           
           var torch = model.clone();
           torch.position.copy(torchPosition);
                    scene.add(torch);
                    var bbox = new THREE.Box3().setFromObject(torch);
                    // Calculate the position of the light
                    var lightPosition = new THREE.Vector3();
                    bbox.getCenter(lightPosition); // Set light position to the center of the bounding box
                    var torchHeight = bbox.max.y - bbox.min.y; // Height of the torch model
                    lightPosition.y = bbox.max.y - torchHeight * 0.1; // Set light position to the top 10% of the torch

                    var light = new THREE.PointLight(0xff6600, 3, 6); // Customize light color, intensity, and distance
                    light.position.copy(lightPosition); // Set light position to the top part of the torch

                    scene.add(light);
         
         }
        }
    }
    function onKeyDown(event) {
        switch (event.key) {
            case 'w': // Move forward
                if (isFirstPerson) {
                    directionVector.setFromMatrixColumn(camera.matrix, 0);
                    directionVector.crossVectors(camera.up, directionVector);
                    directionVector.multiplyScalar(sphereSpeed); // positive for forward
                } else {
                    // Third-person forward logic remains the same as before
                    directionVector.setFromMatrixColumn(camera.matrix, 0);
                    directionVector.crossVectors(camera.up, directionVector);
                    directionVector.multiplyScalar(sphereSpeed);
                }
                break;
            case 's': // Move backward
                if (isFirstPerson) {
                    directionVector.setFromMatrixColumn(camera.matrix, 0);
                    directionVector.crossVectors(camera.up, directionVector);
                    directionVector.multiplyScalar(-sphereSpeed); // negative for backward
                } else {
                    // Third-person backward logic remains the same as before
                    directionVector.setFromMatrixColumn(camera.matrix, 0);
                    directionVector.crossVectors(camera.up, directionVector);
                    directionVector.multiplyScalar(-sphereSpeed);
                }
                break;
            case 'a': // Strafe left
                directionVector.setFromMatrixColumn(camera.matrix, 0);
                directionVector.multiplyScalar(-sphereSpeed); // Negative for left
                break;
            case 'd': // Strafe right
                directionVector.setFromMatrixColumn(camera.matrix, 0);
                directionVector.multiplyScalar(sphereSpeed); // Positive for right
                break;
            case 'e': // Rotate right
                if (isFirstPerson) {
                    cameraRotationY -= Math.PI / 2;
                } else {
                    sphere.rotateY(-Math.PI / 20);
                }
                break;
            case 'q': // Rotate left
                if (isFirstPerson) {
                    cameraRotationY += Math.PI / 2;
                } else {
                    sphere.rotateY(Math.PI / 20);
                }
                break;
            case ' ': // Toggle first-person perspective
                isFirstPerson = !isFirstPerson;
                break;
        }
    
        // If in first person, apply camera rotation directly
        if (isFirstPerson) {
            camera.rotation.y = cameraRotationY;
        }
    }
    
    function onKeyUp(event) {
        if (['w', 's', 'a', 'd'].includes(event.key)) {
            directionVector.set(0, 0, 0);
        }
    }
    
    function checkCollision() {
        // Implement collision detection between the sphere and the maze walls
        // Assuming each wall is a THREE.Mesh and stored in the 'walls' array
    let sphereBox = new THREE.Box3().setFromObject(sphere);

    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        let wallBox = new THREE.Box3().setFromObject(wall);

        if (sphereBox.intersectsBox(wallBox)) {
            // Collision detected, move the sphere back to its previous position
            sphere.position.sub(directionVector.multiplyScalar(sphereSpeed));
            break; // Stop checking further walls once a collision is found
        }
    }
    }
    
// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    requestAnimationFrame(render);

    // Update sphere position based on direction
    if (directionVector.length() > 0) {
        var moveStep = directionVector.clone().multiplyScalar(sphereSpeed);
        sphere.position.add(moveStep);

        // Fix the sphere's Y-position to keep it at a constant height above the ground
        sphere.position.y = 0.5/* desired height, e.g., 0.5 or 1 */;
        
        // Check for collisions
        checkCollision();
    }

    if (isFirstPerson) {
        // In first-person mode, position the camera slightly above the sphere's fixed Y-position
        camera.position.copy(sphere.position).setY(sphere.position.y + 0.2/* slight elevation, e.g., 0.2 */);
        
        // Rotate the camera based on the current angle
        camera.rotation.order = 'YXZ';
        camera.rotation.y = cameraRotationY;
        
        // Forward direction based on camera rotation
        var forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        camera.lookAt(camera.position.clone().add(forward));
    } else {
        // Update camera to follow the sphere from behind and above (as before)
        camera.position.set(sphere.position.x, sphere.position.y + 5, sphere.position.z + 5);
        camera.lookAt(sphere.position);
    }

    renderer.render(scene, camera);
}


// Call init function to set up the scene
init();
