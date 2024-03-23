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
 * This character should draw 3D axes to represent the X,Y,Z axes of for each bone
 * in the animated character.  Use gfx.Geometry3Factory.createAxes(size) create the
 * axes geometry. The size parameter used in the instructors example is 0.15.
 */

export class AxesCharacterGeometry
{
    constructor()
    {
  
    }

    public createGeometry(skeleton: gfx.Skeleton): void
    {
        // This is an example of how to add axes to the root of the skeleton.
        // You should comment out this code and add geometry to each bone
        // in the recursive method below.
        const axes = gfx.Geometry3Factory.createAxes(0.15);
        skeleton.add(axes);

        // Call the recursive method for each root bone
        skeleton.children.forEach((child: gfx.Node3) => {
            if(child instanceof gfx.Bone)
                this.createGeometryRecursive(child);
        });
    }

    private createGeometryRecursive(bone: gfx.Bone): void
    {
        // PART 1: Add axes for the character.  When this step is done,
        // you should see a skeleton in a "T"-pose, with blue axis pointing
        // to the bone's parent in the skeleton.  See the instructor's
        // implementation for an example.
    }
}