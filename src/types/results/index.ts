export namespace Result {
    export interface IItem {
        id: number
        name: string
        img?: string
    }

    export interface IITemCreated {
        name: string
        img?: string
    }

    export interface IItemFiltered {
        id: number
        name: string
    }
}