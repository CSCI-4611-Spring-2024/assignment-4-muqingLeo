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

    }
}