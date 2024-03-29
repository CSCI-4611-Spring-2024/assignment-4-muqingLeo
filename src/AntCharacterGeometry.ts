/* Assignment 4: So You Think Ants Can Dance
 * CSCI 4611, Spring 2024, University of Minnesota
 * Original C++ implementation by UMN CSCI 4611 Instructors, 2012+
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu>, 2022
 * Significant changes by Daniel Keefe <dfk@umn.edu>, 2023
 * Further development by Evan Suma Rosenberg <suma@umn.edu>, 2024
 * PUBLIC DISTRIBUTION OF SOURCE CODE OUTSIDE OF CSCI 4611 IS PROHIBITED
 */ 

import * as gfx from 'gophergfx'

/**
 * This class should draw an Ant or some other interesting custom 3D character by
 * adding geometry to the bones of the character.  We will assume the character's
 * skeleton is a humanoid skeleton in the CMU MoCap database format.  So, you can
 * selectively add geometry to the bone by checking the name of the bone using an
 * "if" statement as demonstrated below.
 */

export class AntCharacterGeometry
{
    constructor()
    {
 
    }

    public createGeometry(skeleton: gfx.Skeleton): void
    {
        // Call the recursive method for each root bone
        skeleton.children.forEach((child: gfx.Node3) => {
            if(child instanceof gfx.Bone)
                this.createGeometryRecursive(child);
        });
    }

    private addAntGeometryRecursive(bone: gfx.Bone): void
    {
        // Your existing code to add the ant geometries...

        // Recursively call this method for each of the bone's children
        bone.children.forEach((child: gfx.Node3) => {
            if (child instanceof gfx.Bone) {
                this.addAntGeometryRecursive(child as gfx.Bone);
            }
        });
    }

    private createGeometryRecursive(bone: gfx.Bone): void
    {
        
        // PART 3: Create a character!
        // For this part, create a convincing custom character out of basic
        // geometries. Start by creating a basic representation for *every* bone
        // (like you did for the skeleton character), and add additional
        // geometries for specific parts of the skeleton. We suggest drawing
        // geometries for at least the following parts (defined in the if
        // statement below):
        // - lowerback
        // - upperbackback
        // - thorax
        // - head
        //
        // A full list of available bones (and their hierarchical relationships)
        // can be seen in the skeleton files, for example /public/assets/data/05.asf.
        //
        // Lastly, add a face to the character! The character's face should
        // demonstrate your knowledge of composing transformations; at least one
        // part of the face should adjust the position, the rotation, and the
        // scale (like the antennae on the instructor solution).
        //     // PART 3.2: Add a face to the character
        // }
        {
            // Assume basic dimensions for body parts
            const headScale = new gfx.Vector3(0.1, 0.1, 0.1);
            const eyeMaterial = new gfx.UnlitMaterial;
            const mouthMaterial = new gfx.PhongMaterial;


            if (bone.name == 'head') {
                // Create and position the geometry for the head
                const headMesh = gfx.Geometry3Factory.createSphere(1, 2);
                const S = gfx.Matrix4.makeScale(headScale);
                const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
                const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
                const M = gfx.Matrix4.multiplyAll(R, T, S);
                headMesh.setLocalToParentMatrix(M, false);
                bone.add(headMesh);
                
                // PART 3.2: Add a face to the character
                // Create and position geometries for eyes, mouth, etc.
                const RighteyeMesh = gfx.Geometry3Factory.createSphere(0.05, 2);
                const RighteyeOffset = new gfx.Vector3(0.1, 0.1, 0.001); 
                const RighteyeMatrix = gfx.Matrix4.makeTranslation(RighteyeOffset);
                RighteyeMesh.setLocalToParentMatrix(RighteyeMatrix, false);
                RighteyeMesh.material = eyeMaterial;
                bone.add(RighteyeMesh);

                const LefteyeMesh = gfx.Geometry3Factory.createSphere(0.05, 2);
                const LefteyeOffset = new gfx.Vector3(-0.1, 0.1, 0.001); 
                const LefteyeMatrix = gfx.Matrix4.makeTranslation(LefteyeOffset);
                LefteyeMesh.setLocalToParentMatrix(LefteyeMatrix, false);
                LefteyeMesh.material = eyeMaterial;
                bone.add(LefteyeMesh);

                const mouthMesh = gfx.Geometry3Factory.createSphere(0.03, 2);
                const mouthOffset = new gfx.Vector3(0, 0, 0.1);
                const mouthMatrix = gfx.Matrix4.makeTranslation(mouthOffset);
                mouthMesh.setLocalToParentMatrix(mouthMatrix, false);
                mouthMesh.material = mouthMaterial;
                bone.add(mouthMesh);
            }
            else if (bone.name == 'thorax' || bone.name == 'upperback') {
                // Create and position the geometry for body segments
                const bodyMesh = gfx.Geometry3Factory.createSphere(bone.length, 2); // Scale the sphere to be proportional to the bone length, with decent detail
                const bodyPos = new gfx.Vector3(0, bone.length / 2, 0); // Center the sphere on the bone
                const bodyMatrix = gfx.Matrix4.makeTranslation(bodyPos);
                bodyMesh.setLocalToParentMatrix(bodyMatrix, false);
                bone.add(bodyMesh);
            }
            else if (bone.name == 'lowerback') {
                const lowerBackMesh = gfx.Geometry3Factory.createSphere(1.5, 2); 
                const ovalScale = new gfx.Vector3(bone.length * 0.8, bone.length, bone.length * 0.8); 
                const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
                const S = gfx.Matrix4.makeScale(ovalScale);
                const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length / 2, 0)); 
                const M = gfx.Matrix4.multiplyAll(R, T, S); 
                lowerBackMesh.setLocalToParentMatrix(M, false);
                bone.add(lowerBackMesh);
            }
            
            // Recursively call this method for each of the bone's children
            bone.children.forEach((child: gfx.Node3) => {
                if (child instanceof gfx.Bone) {
                    this.createGeometryRecursive(child as gfx.Bone);
                }
            });

    }
}
}