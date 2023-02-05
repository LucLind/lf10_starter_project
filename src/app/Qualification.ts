export class Qualification {
    constructor(public designation?: string) { }
}

export class EmployeeQualificationEntry {
    constructor(public designation?: string, public newlyAdded?: boolean, public removeFlag?: boolean) { }
}