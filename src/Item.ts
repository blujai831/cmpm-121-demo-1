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
    rate: number,
    description: string
}

export const availableItems: Item[] = [
    {name: 'beabnsies', cost: 10, rate: 0.1, description:
        "It's beans. You eat them and you fart your way off into oblivion. " +
        "Real funny."},
    {name: 'roket', cost: 100, rate: 2, description:
        "It's a rocket. It makes you go faster."},
    {name: 'bigrkt', cost: 1000, rate: 50, description:
        "It's a bigger rocket. It makes you go fasterer."},
    {name: 'impossible and utterly useless propulsion mechanism 1',
        cost: Infinity,
        rate: 0,
        description: "You can't afford it and also it doesn't work."},
    {name: 'impossible and utterly useless propulsion mechanism 2',
        cost: Infinity*2,
        rate: -0,
        description: "You can't afford it and also it doesn't work, " +
            "but more than the other one."}
];