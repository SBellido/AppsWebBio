import { IGraphNode } from "../Graph";

export const GRAPH: Array<IGraphNode> = [
    {
        id: 1,
        isFirstNode: false,
        isLastNode: false,
        edges: [2, 11],
        row: 1,
        column: 3
    },
    {
        id: 2,
        isFirstNode: false,
        isLastNode: false,
        edges: [1, 3, 11, 12],
        row: 2,
        column: 5
    },
    {
        id: 3,
        isFirstNode: false,
        isLastNode: false,
        edges: [2, 4, 12 , 17],
        row: 4,
        column: 8
    },
    {
        id: 4,
        isFirstNode: false,
        isLastNode: false,
        edges: [3,5],
        row: 3,
        column: 10
    },
    {
        id: 5,
        isFirstNode: false,
        isLastNode: false,
        edges: [4,6],
        row: 1,
        column: 1
    },
    {
        id: 6,
        isFirstNode: false,
        isLastNode: false,      
        edges: [5,7,8],
        row: 1,
        column: 1
    },
    {
        id: 7,
        isFirstNode: false,
        isLastNode: true,
        edges: [6,8],
        row: 1,
        column: 1
    },
    {
        id: 8,
        isFirstNode: false,
        isLastNode: false,
        edges: [6,7,9,19],
        row: 1,
        column: 1
    },
    {
        id: 9,
        isFirstNode: false,
        isLastNode: false,
        edges: [8,10],
        row: 1,
        column: 1
    },
    {
        id: 10,
        isFirstNode: false,
        isLastNode: false,
        edges: [9,19],
        row: 1,
        column: 1
    },
    {
        id: 11,
        isFirstNode: false,
        isLastNode: false,
        edges: [1,2,12,14,15],
        row: 1,
        column: 1
    },
    {
        id: 12,
        isFirstNode: false,
        isLastNode: false,
        edges: [2,3,11,13],
        row: 1,
        column: 1
    },
    {
        id: 13,
        isFirstNode: true,
        isLastNode: false,
        edges: [12],
        row: 1,
        column: 1
    },
    {
        id: 14,
        isFirstNode: false,
        isLastNode: false,
        edges: [11,15,20,21],
        row: 1,
        column: 1
    },
    {
        id: 15,
        isFirstNode: false,
        isLastNode: false,
        edges: [11, 14, 16, 21],
        row: 1,
        column: 1
    },
    {
        id: 16,
        isFirstNode: false,
        isLastNode: false,
        edges: [15,17,22],
        row: 1,
        column: 1
    },
    {
        id: 17,
        isFirstNode: false,
        isLastNode: false,
        edges: [3,16,18],
        row: 1,
        column: 1
    },
    {
        id: 18,
        isFirstNode: false,
        isLastNode: false,
        edges: [17,19,22,23],
        row: 1,
        column: 1
    },
    {
        id: 19,
        isFirstNode: false,
        isLastNode: false,
        edges: [8,10,18,23],
        row: 1,
        column: 1
    },
    {
        id: 20,
        isFirstNode: false,
        isLastNode: false,
        edges: [14, 21],
        row: 1,
        column: 1
    },
    {
        id: 21,
        isFirstNode: false,
        isLastNode: false,
        edges: [14,15,20],
        row: 1,
        column: 1
    },
    {
        id: 22,
        isFirstNode: false,
        isLastNode: false,
        edges: [16,18,23],
        row: 1,
        column: 1
    },
    {
        id: 23,
        isFirstNode: false,
        isLastNode: false,
        edges: [18, 19, 22],
        row: 1,
        column: 1
    }
]