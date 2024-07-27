export class NotAuthenticatedError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}