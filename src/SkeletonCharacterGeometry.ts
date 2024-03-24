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
 * This character should draw each bone as a cylinder with radius 0.01.  Transformation matrices 
 * need to be used to scale, rotate, and translate the cylinder so that it starts at the origin
 * and extends in the bone's direction with a length equal to the bone's length.
 */

export class SkeletonCharacterGeometry
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

    private createGeometryRecursive(bone: gfx.Bone): void
    {

        // PART 2: Create a skeleton.
        //
        // Use a cylinder mesh as a starting point, then scale it, rotate it,
        // and translate it so the bones look like a skeleton. When this part is
        // complete, the skeleton should show representations of every bone, and
        // there should not be gaps between bones.


        // const armMesh = gfx.Geometry3Factory.createBox();
        // const S = gfx.Matrix4.makeScale(new gfx.Vector3(0.05, bone.length, 0.05));
        // const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
        // const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
        // const M = gfx.Matrix4.multiplyAll(R, T, S);
        // armMesh.setLocalToParentMatrix(M, false);

        const cylinderMesh = gfx.Geometry3Factory.createCylinder(20, 0.01, 0.5);
        
        const S = gfx.Matrix4.makeScale(new gfx.Vector3(0.5, 2*bone.length, 0.5));
        const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
        const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -1 * bone.length/2, 0));
        const M = gfx.Matrix4.multiplyAll(R, T, S);   

        cylinderMesh.setLocalToParentMatrix(M, false);
        bone.add(cylinderMesh);

        // Recursively call this method for each of the bone's children.
        bone.children.forEach((child: gfx.Node3) => {
            if (child instanceof gfx.Bone) {
                this.createGeometryRecursive(child);
            }
        });
    }

}
