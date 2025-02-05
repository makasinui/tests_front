import type { Result } from "../results"

export namespace Answers {
    export interface IItem {
        id: number
        name: string
        results: Result.IItem[]
        img?: string
    }

    export interface IItemFiltered extends IItem {
        checked: boolean
        resultsFiltered: Result.IItemFiltered[]
    }

    export interface IItemCreated {
        name: string
        result: Result.IITemCreated[]
        img?: string
    }
}