import { z } from 'zod'
import { BASE_API_ENDPOINT_HEADER_SCHEMA } from '../../common/schema/sharedShemas.js'

export const CONTRIBUTOR_API_BASE_HEADER_SCHEMA = BASE_API_ENDPOINT_HEADER_SCHEMA

export type ContributorApiBaseHeader = z.infer<typeof CONTRIBUTOR_API_BASE_HEADER_SCHEMA>

export const CONTRIBUTOR_LANGUAGE_SCHEMA = z.object({
	lang_id: z.number(),
	lang_iso: z.string(),
	lang_name: z.string(),
	is_writable: z.union([
		z.literal(0),
		z.literal(1),
		z.boolean(), // (╥﹏╥) this is a workaround for the API returning boolean instead of 0/1, as the API spec says
	]),
})

export type ContributorLanguage = z.infer<typeof CONTRIBUTOR_LANGUAGE_SCHEMA>

export const CONTRIBUTOR_SCHEMA = z.object({
	user_id: z.number(),
	email: z.string().email(),
	fullname: z.string(),
	avatar_url: z.string(),
	created_at: z.string(),
	created_at_timestamp: z.number(),

	languages: z.array(CONTRIBUTOR_LANGUAGE_SCHEMA),
	admin_rights: z.array(z.string()),
	permissions: z.array(z.string()),
	role_id: z.number().nullable(),

	is_owner: z.boolean(),
	is_admin: z.boolean(),
	is_reviewer: z.boolean(),
	is_pending: z.boolean(),
	is_reinvited: z.boolean(),
})

export type Contributor = z.infer<typeof CONTRIBUTOR_SCHEMA>

// TODO: We can add more validation on project ID... It can also be extracted to a utils file
const BY_PROJECT_ID = z.object({ id: z.string() })
const BY_CONTRIBUTOR_ID = z.object({ id: z.number() })
const BY_UUID = z.object({ uuid: z.string().uuid() })

const PROJECT_TARGET_SCHEMA = z.union([BY_UUID, BY_PROJECT_ID])
export type ProjectTarget = z.infer<typeof PROJECT_TARGET_SCHEMA>

const CONTRIBUTOR_TARGET_PATH_PARAMS_SCHEMA = z.union([
	z.object({ authenticatedUser: z.literal(true) }),
	BY_UUID,
	BY_CONTRIBUTOR_ID,
])

export type ContributorTargetPathParams = z.infer<typeof CONTRIBUTOR_TARGET_PATH_PARAMS_SCHEMA>

export const LIST_CONTRIBUTORS_PATH_PARAMS_SCHEMA = z.object({
	projectId: z.string(),
})

export type ListContributorsPathParams = z.infer<typeof LIST_CONTRIBUTORS_PATH_PARAMS_SCHEMA>

export const LIST_CONTRIBUTORS_RESPONSE_SCHEMA = z.object({
	project_id: z.string(),
	contributors: z.array(CONTRIBUTOR_SCHEMA),
})

export type ListContributorsResponse = z.infer<typeof LIST_CONTRIBUTORS_RESPONSE_SCHEMA>

export const RETRIEVE_CONTRIBUTOR_PATH_PARAMS_SCHEMA = z.object({
	project: PROJECT_TARGET_SCHEMA,
	contributor: CONTRIBUTOR_TARGET_PATH_PARAMS_SCHEMA,
})

export type RetrieveContributorPathParams = z.infer<typeof RETRIEVE_CONTRIBUTOR_PATH_PARAMS_SCHEMA>

export const RETRIEVE_CONTRIBUTOR_RESPONSE_SCHEMA = z.object({
	project_id: z.string(),
	contributor: CONTRIBUTOR_SCHEMA,
})

export type RetrieveContributorResponse = z.infer<typeof RETRIEVE_CONTRIBUTOR_RESPONSE_SCHEMA>

export const ADD_CONTRIBUTORS_PATH_PARAMS_SCHEMA = z.object({
	project: PROJECT_TARGET_SCHEMA,
})

export type AddContributorsPathParams = z.infer<typeof ADD_CONTRIBUTORS_PATH_PARAMS_SCHEMA>

export const ADD_CONTRIBUTORS_REQUEST_BODY_SCHEMA = z.object({
	contributors: z.array(
		z.object({
			email: z.string().email(),
			fullname: z.string().optional(),
			is_admin: z.boolean().optional(),
			is_reviewer: z.boolean().optional(),
			role_id: z.number().optional(),
			admin_rights: z.array(z.string()).optional(),
			languages: z.array(
				z.object({
					lang_iso: z.string(),
					is_writable: z.boolean().optional(),
				}),
			),
		}),
	),
})
export type AddContributorsRequestBody = z.infer<typeof ADD_CONTRIBUTORS_REQUEST_BODY_SCHEMA>

export const ADD_CONTRIBUTORS_RESPONSE_SCHEMA = z.object({
	project_id: z.string(),
	project_uuid: z.string(),
	contributors: z.array(CONTRIBUTOR_SCHEMA),
})

export type AddContributorsResponse = z.infer<typeof ADD_CONTRIBUTORS_RESPONSE_SCHEMA>

export const UPDATE_CONTRIBUTORS_PATH_PARAMS_SCHEMA = z.object({
	project: PROJECT_TARGET_SCHEMA,
	contributorId: z.string(),
})

export type UpdateContributorsPathParams = z.infer<typeof UPDATE_CONTRIBUTORS_PATH_PARAMS_SCHEMA>

export const UPDATE_CONTRIBUTORS_REQUEST_BODY_SCHEMA = z.object({
	is_admin: z.boolean().optional(),
	is_reviewer: z.boolean().optional(),
	role_id: z.number().optional(),
	admin_rights: z.array(z.string()).optional(),
	languages: z.array(
		z.object({
			lang_iso: z.string(),
			is_writable: z.boolean().optional(),
		}),
	),
})
export type UpdateContributorsRequestBody = z.infer<typeof UPDATE_CONTRIBUTORS_REQUEST_BODY_SCHEMA>

export const UPDATE_CONTRIBUTORS_RESPONSE_SCHEMA = z.object({
	project_id: z.string(),
	contributor: CONTRIBUTOR_SCHEMA,
})

export type UpdateContributorsResponse = z.infer<typeof UPDATE_CONTRIBUTORS_RESPONSE_SCHEMA>

export const DELETE_CONTRIBUTOR_PATH_PARAMS_SCHEMA = z.object({
	project: PROJECT_TARGET_SCHEMA,
	contributor: z.union([BY_UUID, BY_CONTRIBUTOR_ID]),
})

export type DeleteContributorPathParams = z.infer<typeof DELETE_CONTRIBUTOR_PATH_PARAMS_SCHEMA>

export const DELETE_CONTRIBUTOR_RESPONSE_SCHEMA = z.object({
	project_id: z.string(),
	contributor_deleted: z.boolean(),
})

export type DeleteContributorResponse = z.infer<typeof DELETE_CONTRIBUTOR_RESPONSE_SCHEMA>
