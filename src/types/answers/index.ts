export namespace Answers {
    export interface IItem {
        id: number
        name: string
        img?: string
    }

    export interface IItemFiltered extends IItem {
        checked: boolean
    }
}