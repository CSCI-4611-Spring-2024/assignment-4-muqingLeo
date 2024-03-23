/* Assignment 4: So You Think Ants Can Dance
 * CSCI 4611, Spring 2024, University of Minnesota
 * Original C++ implementation by UMN CSCI 4611 Instructors, 2012+
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu>, 2022
 * Significant changes by Daniel Keefe <dfk@umn.edu>, 2023
 * Further development by Evan Suma Rosenberg <suma@umn.edu>, 2024
 * PUBLIC DISTRIBUTION OF SOURCE CODE OUTSIDE OF CSCI 4611 IS PROHIBITED
 */ 

import * as gfx from 'gophergfx'
import { AxesCharacterGeometry } from './AxesCharacterGeometry'
import { SkeletonCharacterGeometry } from './SkeletonCharacterGeometry'
import { AntCharacterGeometry } from './AntCharacterGeometry'

export class AnimatedCharacter extends gfx.Skeleton
{
    public animationController: gfx.AnimationController;

    private axesCharacterGeometry: AxesCharacterGeometry;
    private skeletonCharacterGeometry: SkeletonCharacterGeometry;
    private antCharacterGeometry: AntCharacterGeometry;

    constructor(fps = 60, useAbsolutePosition = true)
    {
        super();
        
        // Create the animation controller
        this.animationController = new gfx.AnimationController(this, fps, useAbsolutePosition);

        // Initialize the various types of character geometry
        this.axesCharacterGeometry = new AxesCharacterGeometry();
        this.skeletonCharacterGeometry = new SkeletonCharacterGeometry();
        this.antCharacterGeometry = new AntCharacterGeometry();
    }

    public createGeometry(character: string): void
    {
        // Remove the current character geometry from the skeleton
        this.removeGeometry();

        // Create the new character geometry
        if(character == "Axes")
        {
            this.axesCharacterGeometry.createGeometry(this);
        }
        else if(character == "Skeleton")
        {
            this.skeletonCharacterGeometry.createGeometry(this);
        }
        else if(character == "Ant")
        {
            this.antCharacterGeometry.createGeometry(this);
        }
    }

    public removeGeometry(): void
    {
        // Call the recursive method for each root bone
        // We use array indexing because we need to iterate in reverse 
        // order so the indices don't change as we remove elements.
        for(let i=this.children.length-1; i >= 0; i--)
        {
            this.removeGeometryRecursive(this.children[i]);
        }
    }

    private removeGeometryRecursive(node: gfx.Node3): void
    {
        if(!(node instanceof gfx.Bone))
        {
            node.remove();
        }

        // Recursively call this function for each of the bone's children
        for(let i=node.children.length-1; i >= 0; i--)
        {
            this.removeGeometryRecursive(node.children[i]);
        }
    }
}