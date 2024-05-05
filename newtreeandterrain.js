//by AKSHYAT CHAPAGAIN


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Define variables
var scene, camera, renderer,tree,tree2,tree3;
var terrain;

// Initialize Three.js scene
function init() {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 6);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);   

  // Create terrain
  createTerrain();
  createSkydome();
  createFog();


  for (let i = 0; i <100 ; i++) {
    createTree();
    createTree2();
    createTree3()
  }
  
  // Add event listener for window resize
  window.addEventListener('resize', onWindowResize, false);

  // Grid Helper
  //const gridHelper = new THREE.GridHelper(10, 50, 'red', 'white');
  //scene.add(gridHelper);

  // Orbit controls
  const orbit = new OrbitControls(camera, renderer.domElement);

  // Lights for better visibility
  var ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Render the scene
  render();
}

// Create terrain
function createTerrain() {
  var geometry = new THREE.PlaneGeometry(30, 30, 4, 6);

  // Create material
  var material = new THREE.MeshStandardMaterial({ color: ("rgb(110, 181, 43)"), flatShading: false, side: THREE.DoubleSide });

  // Create terrain mesh
  terrain = new THREE.Mesh(geometry, material);

  terrain.rotation.x = -Math.PI / 2; // Rotate the terrain to make it horizontal
  terrain.position.y=0.0;
  scene.add(terrain);
}



function createTree3() {
   tree3 = new THREE.Group();

  // Trunk
  const trunkGeometry3 = new THREE.CylinderGeometry(0.03, 0.18, 1.6, 8);
  const trunkMaterial3 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk3 = new THREE.Mesh(trunkGeometry3, trunkMaterial3);
  trunk3.position.y = 0.1;
  tree3.add(trunk3);

  const leavesGeometry1 = new THREE.SphereGeometry(0.2, 15, 15);
  leavesGeometry1.scale(1, 0.6, 1);
        const leavesMaterial1 = new THREE.MeshStandardMaterial({ color:"rgb(56, 194, 62)" , roughness: 0.8 });
        const leaves1 = new THREE.Mesh(leavesGeometry1, leavesMaterial1);
        
        leaves1.position.set(-0.1, 1.1, 0);
        tree3.add(leaves1)


  // Main Branch
  const mainBranchGeometry3 = new THREE.CylinderGeometry(0.01, 0.03, 0.8, 8);
  const mainBranchMaterial3 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const mainBranch = new THREE.Mesh(mainBranchGeometry3, mainBranchMaterial3);
  mainBranch.position.y = 0.7;
  mainBranch.position.x = 0.3;
  mainBranch.rotation.z = 0.9*Math.PI * 2;
  tree3.add(mainBranch);

  const branchgeometry2 = new THREE.CylinderGeometry(0.01, 0.03, 0.8, 8);
  const branchmaterial2 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const branch2 = new THREE.Mesh(branchgeometry2,branchmaterial2);
  branch2.position.y = 0.7;
  branch2.position.x = 0.3;
  branch2.rotation.z = 0.9*Math.PI * 2;//right branch first
  tree3.add(branch2);

  const branchgeometry3 = new THREE.CylinderGeometry(0.01, 0.03, 0.6, 8);
  const branchmaterial3 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const branch3 = new THREE.Mesh(branchgeometry3,branchmaterial3);
  branch3.position.y = 0.4;
  branch3.position.x = -0.2;
  branch3.position.z = 0.2;
  branch3.rotation.z = 0.1*Math.PI * 2;
  branch3.rotation.x = 0.1*Math.PI * 2;//left branch first
  tree3.add(branch3);

  const leavesGeometry4 = new THREE.SphereGeometry(0.1, 15, 15);
  leavesGeometry4.scale(3.3,3.0,3.0);
  const leavesMaterial4 = new THREE.MeshStandardMaterial({ color:"rgb(56, 194, 62)" , roughness: 0.8 });
  const leaves4 = new THREE.Mesh(leavesGeometry4, leavesMaterial4);
  leaves4.position.set(-0.37, 0.7 , 0.3);
  tree3.add(leaves4);


  const leavesGeometry2 = new THREE.SphereGeometry(0.3, 15, 15);
  leavesGeometry2.scale(1.0, 0.7, 0.7);
        const leavesMaterial2 = new THREE.MeshStandardMaterial({ color:"rgb(56, 194, 62)" , roughness: 0.8 });
        const leaves2 = new THREE.Mesh(leavesGeometry2, leavesMaterial2);
        
        leaves2.position.set(0.4, 0.89, 0);
        tree3.add(leaves2)


  const branchgeometry4 = new THREE.CylinderGeometry(0.01, 0.03, 0.4, 8);
  const branchmaterial4 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const branch4 = new THREE.Mesh(branchgeometry4,branchmaterial4);
  branch4.position.y = 0.99;
  branch4.position.x = 0.09;
  branch4.rotation.z = 0.91*Math.PI * 2;//right branch top
  tree3.add(branch4);

  const branch6 = new THREE.Mesh(branchgeometry4,branchmaterial4);
  branch6.position.y = 0.99;
  branch6.position.x = -0.09;
  branch6.rotation.z = -0.91*Math.PI * 2;//left branch top
  tree3.add(branch6);

  const leavesGeometry3 = new THREE.SphereGeometry(0.17, 15, 15);
        const leavesMaterial3 = new THREE.MeshStandardMaterial({ color:"rgb(56, 194, 62)" , roughness: 0.8 });
        const leaves3 = new THREE.Mesh(leavesGeometry3, leavesMaterial3);
        
        leaves3.position.set(0.2, 1.2, 0);
        tree3.add(leaves3)


  const branchgeometry5= new THREE.CylinderGeometry(0.01, 0.03, 0.4, 8);
        const branchmaterial5 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const branch5 = new THREE.Mesh(branchgeometry5,branchmaterial5);
        branch5.position.y = 0.5;
        branch5.position.x = -0.080;
        branch5.position.z = -0.18;
        branch5.rotation.x = 0.80*Math.PI * 2;
        branch5.rotation.z = 0.1*Math.PI * 2;
        branch5.rotation.y = 0.2*Math.PI * 2;
        tree3.add(branch5);

        const leavesGeometry5 = new THREE.SphereGeometry(0.1, 15, 15);
        leavesGeometry5.scale(2.2,2,2);
        const leavesMaterial5 = new THREE.MeshStandardMaterial({ color:"rgb(56, 194, 62)" , roughness: 0.8 });
        const leaves5 = new THREE.Mesh(leavesGeometry5, leavesMaterial5);
        leaves5.position.set(0.1, 0.8, 0.3);
        tree3.add(leaves5);

       
   const branch7 = new THREE.Mesh(branchgeometry5,branchmaterial5);
        branch7.position.y = 0.6; //
        branch7.position.x = 0.080;
        branch7.position.z =0.15;
        branch7.rotation.x = 0.7*Math.PI * 2;
        branch7.rotation.z = -0.6*Math.PI * 2;
        branch7.rotation.y = 0.3*Math.PI * 2;
        tree3.add(branch7);

        //const leavesGeometry6 = new THREE.SphereGeometry(0.1, 15, 15);
        const leavesGeometry6 = new THREE.OctahedronGeometry(0.1, 3);
        leavesGeometry6.scale(3.33,3,3);
        const leavesMaterial6 = new THREE.MeshStandardMaterial({ color:"rgb(56, 194, 62)" , roughness: 0.8 });
        const leaves6 = new THREE.Mesh(leavesGeometry6, leavesMaterial6);
        leaves6.position.set(-0.1, 0.59, -0.3);
        tree3.add(leaves6);

    
    tree3.scale.setScalar(1);
    // Attempt to place tree at a non-overlapping position
    const maxAttempts = 500;
    let placed = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const x = Math.random() * 20 - 10;
        const z = Math.random() * 20 - 10;
        const y = 0.7;  // Adjust the y-coordinate based on your terrain's altitude map if necessary

        let tooClose = scene.children.some(child => {
            if (child instanceof THREE.Group && child !== tree) {
                const distance = Math.sqrt((child.position.x - x) ** 2 + (child.position.z - z) ** 2);
                return distance < 1; // Minimum distance between trees
            }
            return false;
        });

        if (!tooClose) {
            tree3.position.set(x, y, z);
            tree3.scale.setScalar(1);
            scene.add(tree3);
            placed = true;
            break;
        }
    }

    if (!placed) {
        console.log("Failed to place a tree after", maxAttempts, "attempts");
    }
      
  
}



function createTree2() {
   tree2 = new THREE.Group();

  // Trunk
  const trunkGeometry2 = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16);
  const trunkMaterial2 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk2 = new THREE.Mesh(trunkGeometry2, trunkMaterial2);
  trunk2.position.set(0, 0.5, 0);
  tree2.add(trunk2);

  // Leaves
  const leavesGeometry2 = new THREE.ConeGeometry(0.4, 1, 15);
  const leavesMaterial2 = new THREE.MeshStandardMaterial({ color:("rgb(18, 120, 23)"), roughness: 0.8 });
  const leaves2 = new THREE.Mesh(leavesGeometry2, leavesMaterial2);
  leaves2.position.set(0, 1, 0);
  tree2.add(leaves2);

  // Random position within the terrain bounds
  // Attempt to place tree at a non-overlapping position
  const maxAttempts = 500;
  let placed = false;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = Math.random() * 20 - 10;
      const z = Math.random() * 20 - 10;
      const y = -0.1;  // Adjust the y-coordinate based on your terrain's altitude map if necessary

      let tooClose = scene.children.some(child => {
          if (child instanceof THREE.Group && child !== tree2) {
              const distance = Math.sqrt((child.position.x - x) ** 2 + (child.position.z - z) ** 2);
              return distance < 1; // Minimum distance between trees
          }
          return false;
      });

      if (!tooClose) {
          tree2.position.set(x, y, z);
          tree2.scale.setScalar(1);
          scene.add(tree2);
          placed = true;
          break;
      }
  }

  if (!placed) {
      console.log("Failed to place a tree after", maxAttempts, "attempts");
  }
    

    }

  function createTree() {
    const tree = new THREE.Group();

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.75, 16);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(0, 0.5, 0);
    tree.add(trunk);

    // Leaves
    const leavesGeometry = new THREE.OctahedronGeometry(0.5, 3);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: "rgb(56, 194, 62)", roughness: 0.8 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(0, 1.1, 0);
    tree.add(leaves);

    // Attempt to place tree at a non-overlapping position
    const maxAttempts = 500;
    let placed = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const x = Math.random() * 20 - 10;
        const z = Math.random() * 20 - 10;
        const y = -0.1;  // Adjust the y-coordinate based on your terrain's altitude map if necessary

        let tooClose = scene.children.some(child => {
            if (child instanceof THREE.Group && child !== tree) {
                const distance = Math.sqrt((child.position.x - x) ** 2 + (child.position.z - z) ** 2);
                return distance < 1; // Minimum distance between trees
            }
            return false;
        });

        if (!tooClose) {
            tree.position.set(x, y, z);
            tree.scale.setScalar(1);
            scene.add(tree);
            placed = true;
            break;
        }
    }

    if (!placed) {
        console.log("Failed to place a tree after", maxAttempts, "attempts");
    }
      
    
          }


  function createSkydome() {
    // Skydome geometry
    const skydomeGeometry = new THREE.SphereGeometry(300, 32, 32);
  
    // Skydome material 
    const skydomeMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('./sky3.jpg'),
      side: THREE.BackSide, // Render on the inside of the sphere
      fog: false
    });
  
    // Create the skydome mesh
    const skydome = new THREE.Mesh(skydomeGeometry, skydomeMaterial);
    // Add the skydome to the scene
    scene.add(skydome);
  }


  function createFog() {
    scene.fog = new THREE.FogExp2(0xcce0ff, 0.10); 
  }

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// Call init function to set up the scene
init();