/* Assignment 4: So You Think Ants Can Dance
 * CSCI 4611, Spring 2024, University of Minnesota
 * Original C++ implementation by UMN CSCI 4611 Instructors, 2012+
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu>, 2022
 * Significant changes by Daniel Keefe <dfk@umn.edu>, 2023
 * Further development by Evan Suma Rosenberg <suma@umn.edu>, 2024
 * PUBLIC DISTRIBUTION OF SOURCE CODE OUTSIDE OF CSCI 4611 IS PROHIBITED
 */ 

import * as gfx from 'gophergfx'

import { GUI } from 'dat.gui'
import { AnimatedCharacter } from './AnimatedCharacter'

enum AppState
{
    LOADING_SKELETONS,
    LOADING_ANIMATIONS,
    SHOWING_CALIBRATION_POSE,
    ANIMATING_CHARACTERS
}

export class App extends gfx.GfxApp
{
    // Animated characters
    private salsaLeadCharacter: AnimatedCharacter;
    private salsaFollowCharacter: AnimatedCharacter;
    private balletCharacter: AnimatedCharacter;

    // Motion clips
    private salsaMotionLead: gfx.Animation;
    private salsaMotionFollow: gfx.Animation;
    private balletBaseLoop: gfx.Animation;
    private balletDanceMotions: gfx.Animation[];

    // State variables
    private state: AppState;
    public sceneOptions = ['Ballet Studio', 'Salsa Class']
    public characterOptions = ['Axes', 'Skeleton', 'Ant']
    public currentScene: string;
    public currentCharacter: string;


    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        // Create the animated characters
        this.salsaLeadCharacter = new AnimatedCharacter(60, true);
        this.salsaFollowCharacter = new AnimatedCharacter(60, true);
        this.balletCharacter = new AnimatedCharacter(120, false);

        // Load the skeletons
        gfx.AnimationLoader.loadASF('./assets/data/60.asf', this.salsaLeadCharacter);
        gfx.AnimationLoader.loadASF('./assets/data/61.asf', this.salsaFollowCharacter);
        gfx.AnimationLoader.loadASF('./assets/data/61.asf', this.balletCharacter);

        // Create the animations
        this.salsaMotionLead = new gfx.Animation();
        this.salsaMotionFollow = new gfx.Animation();
        this.balletBaseLoop = new gfx.Animation();
        this.balletDanceMotions = [];

        this.state = AppState.LOADING_SKELETONS;
        this.currentScene = this.sceneOptions[0];
        this.currentCharacter = this.characterOptions[0];
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 50)
        this.camera.position.set(0, 1.5, 3.5);
        this.camera.lookAt(new gfx.Vector3(0, 1, 0));

        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Vector3(0.3, 0.3, 0.3));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Vector3(0.6, 0.6, 0.6));
        directionalLight.position.set(0, 2, 1);
        this.scene.add(directionalLight);

        // Set the background image
        const background = gfx.Geometry2Factory.createBox(2, 2);
        background.material.texture = new gfx.Texture('./assets/images/ants-dance.jpg');
        background.material.texture.setMinFilter(true, false);
        background.layer = 1;
        this.scene.add(background);
        
        // Create the wood floor material
        const floorMaterial = new gfx.GouraudMaterial();
        floorMaterial.texture = new gfx.Texture('assets/images/woodfloor.jpg');
        
        // Create the floor mesh
        const floorMesh = gfx.Geometry3Factory.createPlane(14, 6);
        floorMesh.material = floorMaterial;
        floorMesh.rotation.setRotationX(Math.PI / 2);
        this.scene.add(floorMesh);

        // Create the GUI
        const gui = new GUI();
        gui.width = 300;

        const sceneController = gui.add(this, 'currentScene', this.sceneOptions);
        sceneController.name("Dance Scene");
        sceneController.onChange((value: string) => { this.changeScene() });

        const characterController = gui.add(this, 'currentCharacter', this.characterOptions);
        characterController.name("Character Type");
        characterController.onChange((value: string) => { this.createCharacterGeometry() });

        gui.add(this, 'toggleCalibrationPose').name("Play/Stop Animation");
        gui.add(this, 'queueMotion1').name('Queue Ballet Motion 1');
        gui.add(this, 'queueMotion2').name('Queue Ballet Motion 2');
        gui.add(this, 'queueMotion3').name('Queue Ballet Motion 3');
        gui.add(this, 'queueMotion4').name('Queue Ballet Motion 4');
        gui.add(this, 'queueMotion5').name('Queue Ballet Motion 5');


        // Set the initial positions of the characters
        this.salsaLeadCharacter.position.set(0, 0, 0.5);
        this.salsaFollowCharacter.position.set(0, 0, 0.5);
        this.balletCharacter.position.set(0, 1, 0);
    }


     // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        // We need the skeleton data to correctly load the animations. So, we wait until 
        // the skeleton data is finished loading and then we start loading the animations.
        if(this.state == AppState.LOADING_SKELETONS && this.assetManager.allAssetsLoaded())
        {
            // Move to the next state
            this.state = AppState.LOADING_ANIMATIONS;

            // Load the salsa dance motions
            this.salsaMotionLead = gfx.AnimationLoader.loadAMC('./assets/data/60_12.amc', this.salsaLeadCharacter);
            this.salsaMotionFollow = gfx.AnimationLoader.loadAMC('./assets/data/61_12.amc', this.salsaFollowCharacter);

            // Load the ballet idle motion
            this.balletBaseLoop = gfx.AnimationLoader.loadAMC('./assets/data/05_20.amc', this.balletCharacter);

            // Add the first ballet dance motion
            this.balletDanceMotions.push(gfx.AnimationLoader.loadAMC('./assets/data/05_02.amc', this.balletCharacter));


            // PART 4.1: Add special motions 2-5 on your own.
            // You can pick your own motions from the CMU mocap database or you can use the same
            // dance moves that we did. These files are located in the public/assets/data folder.
            // We used 05_10.amc, 05_09.amc, 05_20.amc, and 05_06.amc.  However, note that there
            // are many other motions for this dancer in the CMU mocap database!  To download
            // other .amc files, go to http://mocap.cs.cmu.edu, enter the subject number, and
            // then click the search button.  For example, if you search for subject 05, you
            // will find that there are a total of 20 different motion clips to choose from.
            //
            // For this part, please do your best to ensure that the motions that
            // you pick keep the character within the bounds of the screen when the
            // animations are played in order 1-5.
            //
            // Don't forget to trim the animations similar to the other clips below.


        }
        else if(this.state == AppState.LOADING_ANIMATIONS && this.assetManager.allAssetsLoaded())
        {
            // Move to the next state
            this.state = AppState.SHOWING_CALIBRATION_POSE;

            // This code trims the excess data from the from the beginning and end of each clip.
            // The salsa and ballet idle animations also need to be interpolated to create a loop.
            this.salsaMotionLead.trimFront(100);
            this.salsaMotionLead.trimBack(150);
            this.salsaMotionLead.makeLoop(100);

            this.salsaMotionFollow.trimFront(100);
            this.salsaMotionFollow.trimBack(150);
            this.salsaMotionFollow.makeLoop(100);
            
            this.balletBaseLoop.trimBack(600);
            this.balletBaseLoop.makeLoop(50);
            

            // PART 4.2: Trim the motion clips (like we did for clip 0).
            // Keep in mind that (at least for Subject 05), the motion clips are at
            // 120 frames per second. So, `clip.trimFront(120)` would start the clip
            // 1 second later, and `clip.trimBack(120)` would end the clip 1 second
            // earlier.
            //
            // When you're done, play each  clip and make sure:
            // - there is no "idle" time at the start or end of each clip
            // - the character stays on screen when you play each motion in sequence


            // Set the scene and create the geometry for the animated characters
            this.changeScene();
            this.createCharacterGeometry();

            // Add the animated characters to the scene
            this.scene.add(this.salsaLeadCharacter);
            this.scene.add(this.salsaFollowCharacter);
            this.scene.add(this.balletCharacter);

            // Apply the calibration pose to the characters
            this.applyCalibrationPose();
        }
        else if (this.state == AppState.ANIMATING_CHARACTERS)
        {
            // If everything is finished loading, then update the animated character animations.
            this.salsaLeadCharacter.animationController.update(deltaTime);
            this.salsaFollowCharacter.animationController.update(deltaTime);
            this.balletCharacter.animationController.update(deltaTime);
        }
    }


    public changeScene(): void
    {
        if(this.currentScene == 'Ballet Studio')
        {
            this.salsaLeadCharacter.visible = false;
            this.salsaFollowCharacter.visible = false;
            this.balletCharacter.visible = true;
        }
        else
        {
            this.salsaLeadCharacter.visible = true;
            this.salsaFollowCharacter.visible = true;
            this.balletCharacter.visible = false;
        }
    }


    public createCharacterGeometry(): void
    {
        this.salsaLeadCharacter.createGeometry(this.currentCharacter);
        this.salsaFollowCharacter.createGeometry(this.currentCharacter);
        this.balletCharacter.createGeometry(this.currentCharacter);
    }


    public toggleCalibrationPose(): void
    {
        if (this.state == AppState.SHOWING_CALIBRATION_POSE) 
        {
            this.state = AppState.ANIMATING_CHARACTERS;

            // Start the looping dance animations
            this.salsaLeadCharacter.animationController.play(this.salsaMotionLead);
            this.salsaFollowCharacter.animationController.play(this.salsaMotionFollow);
            this.balletCharacter.animationController.play(this.balletBaseLoop);

            // Set the ballet character to use relative positions
            this.balletCharacter.animationController.useAbsolutePosition = false;
        } 
        else if (this.state == AppState.ANIMATING_CHARACTERS) 
        {
            this.state = AppState.SHOWING_CALIBRATION_POSE;
            
            // Stop the animations
            this.salsaLeadCharacter.animationController.stop();
            this.salsaFollowCharacter.animationController.stop();
            this.balletCharacter.animationController.stop();

            // Apply the calibration pose to the characters
            this.applyCalibrationPose();
        }
    }


    public applyCalibrationPose(): void
    {
        // The default pose has all joint angles equal to zero, so applying this pose
        // should show the skeleton in its default, calibration pose.
        const calibrationPose = new gfx.Keyframe();

        // Apply this pose to each character.  The only change is to set the root position
        // to separate the two salsa characters and to set the height of the root node to
        // 1 meter off the ground so that the legs are visible above the ground.
        calibrationPose.rootPosition.set(1, 1, 0);
        this.salsaLeadCharacter.animationController.applyPose(calibrationPose);

        calibrationPose.rootPosition.set(-1, 1, 0);
        this.salsaFollowCharacter.animationController.applyPose(calibrationPose);

        calibrationPose.rootPosition.set(0, 1, 0);
        this.balletCharacter.animationController.useAbsolutePosition = true;
        this.balletCharacter.animationController.applyPose(calibrationPose);
    }


    queueMotion1(): void
    {
        if(this.state == AppState.ANIMATING_CHARACTERS && this.balletCharacter.visible) 
        {
            this.balletCharacter.animationController.overlay(this.balletDanceMotions[0], 100);
            console.log('Queueing motion 1; queue size is: ' + this.balletCharacter.animationController.getQueueCount());
        }
    }


    queueMotion2(): void
    {

        // PART 4.3: Overlay the animation, similar to motion 1.
        
    }


    queueMotion3(): void
    {

        // PART 4.3: Overlay the animation, similar to motion 1.

    }


    queueMotion4(): void
    {

        // PART 4.3: Overlay the animation, similar to motion 1.

    }


    queueMotion5(): void
    {

        // PART 4.3: Overlay the animation, similar to motion 1.

    }
}