/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	ListEntries = "list_entries",
	Lists = "lists",
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

export type ListEntriesRecord = {
	field?: RecordIdString
	media_id?: number
}

export type ListsRecord = {
	field?: RecordIdString
	name?: string
}

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
export type ListEntriesResponse<Texpand = unknown> = Required<ListEntriesRecord> & BaseSystemFields<Texpand>
export type ListsResponse<Texpand = unknown> = Required<ListsRecord> & BaseSystemFields<Texpand>
export type RatingResponse<Texpand = unknown> = Required<RatingRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WatchesResponse<Texpand = unknown> = Required<WatchesRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	list_entries: ListEntriesRecord
	lists: ListsRecord
	rating: RatingRecord
	users: UsersRecord
	watches: WatchesRecord
}

export type CollectionResponses = {
	list_entries: ListEntriesResponse
	lists: ListsResponse
	rating: RatingResponse
	users: UsersResponse
	watches: WatchesResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'list_entries'): RecordService<ListEntriesResponse>
	collection(idOrName: 'lists'): RecordService<ListsResponse>
	collection(idOrName: 'rating'): RecordService<RatingResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'watches'): RecordService<WatchesResponse>
}
