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

        // PART 3.1: Draw specific parts of the character
        // if (bone.name == 'lowerback')
        // {
        // }
        // else if (bone.name == 'upperback')
        // {
        // }
        // else if (bone.name == 'thorax')
        // {
        // }
        // else if (bone.name == 'head')
        // {
        //     // PART 3.2: Add a face to the character
        // }

    }
}