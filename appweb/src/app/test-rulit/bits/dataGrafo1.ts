export const GRAFO = [
    {
        id: 1,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [2,11]
    },
    {
        id: 2,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [1,11,12,3]
    },
    {
        id: 3,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [2,12,4,17]
    },
    {
        id: 4,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [3,5]
    },
    {
        id: 5,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [4,6]
    },
    {
        id: 6,
        esNodoInicial: false,
        esNodoFinal: false,      
        vecinos: [5,7,8]
    },
    {
        id: 7,
        esNodoInicial: false,
        esNodoFinal: true,
        vecinos: [6,8]
    },
    {
        id: 8,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [6,7,9,19]
    },
    {
        id: 9,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [8,10]
    },
    {
        id: 10,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [9,19]
    },
    {
        id: 11,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [1,2,12,14,15]
    },
    {
        id: 12,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [2,3,11,13]
    },
    {
        id: 13,
        esNodoInicial: true,
        esNodoFinal: false,
        vecinos: [12]
    },
    {
        id: 14,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [11,15,20,21]
    },
    {
        id: 15,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [11,14,16,21]
    },
    {
        id: 16,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [15,17,22]
    },
    {
        id: 17,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [3,16,18]
    },
    {
        id: 18,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [17,19,22,23]
    },
    {
        id: 19,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [8,10,18,23]
    },
    {
        id: 20,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [14,21]
    },
    {
        id: 21,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [14,15,20]
    },
    {
        id: 22,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [16,18,23]
    },
    {
        id: 23,
        esNodoInicial: false,
        esNodoFinal: false,
        vecinos: [18,19,22]
    }
]