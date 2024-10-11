/* Let it be known that I really dislike how restrictive this mandatory API is
and how much perfectly fine and far more adaptable code I had to throw away
to migrate to it. I doubt I'll ever build off this project in the future,
but if I do, I'm building off the version from step 8. I believe I understand
the point: sometimes we have to be willing to adjust our code
to satisfy a very technical and precise specification, that constrains
how we can write it, not just what it does. Still, this lesson
has been very painful to learn. I don't think I was really doing
anything wrong, so I feel like I'm being punished for no reason.
Is this how professional software development feels all the time? */

export interface Item {
    name: string,
    cost: number,
    rate: number
}

export const availableItems: Item[] = [
    {name: 'beabnsies', cost: 10, rate: 0.1},
    {name: 'roket', cost: 100, rate: 2},
    {name: 'bigrkt', cost: 1000, rate: 50}
];