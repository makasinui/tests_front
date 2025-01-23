export namespace Quiz {
    export interface IBackItem {
        count: number
        rows: IItem[]
    }
    export interface IItem {
        id: number
        title: string
        subtitle?: string
        img?: string
    }
}