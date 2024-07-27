/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Rating = "rating",
	Users = "users",
	Watches = "watches",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type RatingRecord = {
	media_id?: number
	rating?: number
	user_id?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type WatchesRecord = {
	media_id?: number
	user_id?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type RatingResponse<Texpand = unknown> = Required<RatingRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WatchesResponse<Texpand = unknown> = Required<WatchesRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	rating: RatingRecord
	users: UsersRecord
	watches: WatchesRecord
}

export type CollectionResponses = {
	rating: RatingResponse
	users: UsersResponse
	watches: WatchesResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'rating'): RecordService<RatingResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'watches'): RecordService<WatchesResponse>
}
