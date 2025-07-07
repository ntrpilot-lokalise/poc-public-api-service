import { buildDeleteRoute, buildGetRoute, buildPayloadRoute } from '@lokalise/api-contracts'
import {
	ADD_CONTRIBUTORS_PATH_PARAMS_SCHEMA,
	ADD_CONTRIBUTORS_REQUEST_BODY_SCHEMA,
	ADD_CONTRIBUTORS_RESPONSE_SCHEMA,
	CONTRIBUTOR_API_BASE_HEADER_SCHEMA,
	type ContributorTargetPathParams,
	DELETE_CONTRIBUTOR_PATH_PARAMS_SCHEMA,
	DELETE_CONTRIBUTOR_RESPONSE_SCHEMA,
	LIST_CONTRIBUTORS_PATH_PARAMS_SCHEMA,
	LIST_CONTRIBUTORS_RESPONSE_SCHEMA,
	type ProjectTarget,
	RETRIEVE_CONTRIBUTOR_PATH_PARAMS_SCHEMA,
	RETRIEVE_CONTRIBUTOR_RESPONSE_SCHEMA,
	UPDATE_CONTRIBUTORS_PATH_PARAMS_SCHEMA,
	UPDATE_CONTRIBUTORS_REQUEST_BODY_SCHEMA,
	UPDATE_CONTRIBUTORS_RESPONSE_SCHEMA,
} from './contributorsSchemas.js'

const resolveContributorTargetPath = (contributor: ContributorTargetPathParams) => {
    if ('authenticatedUser' in contributor) return 'me'
    if ('uuid' in contributor) return contributor.uuid
    return `${contributor.id}`
}

const resolveProjectTargetPath = (project: ProjectTarget) => {
    return 'uuid' in project ? project.uuid : project.id
}

/**
 * Public API router definition for retrieving a list of contributors
 */
export const listContributorsContract = buildGetRoute({
    description: 'List all contributors for a project',

    requestHeaderSchema: CONTRIBUTOR_API_BASE_HEADER_SCHEMA,

    requestPathParamsSchema: LIST_CONTRIBUTORS_PATH_PARAMS_SCHEMA,
    pathResolver: ({ projectId }) => `/projects/${projectId}/contributors`,

    successResponseBodySchema: LIST_CONTRIBUTORS_RESPONSE_SCHEMA,
})

/**
 * Public API router definition for retrieving a project contributor
 */
export const retrieveContributorContract = buildGetRoute({
    description: 'Get the details of a project contributor',

    requestHeaderSchema: CONTRIBUTOR_API_BASE_HEADER_SCHEMA,

    requestPathParamsSchema: RETRIEVE_CONTRIBUTOR_PATH_PARAMS_SCHEMA,
    pathResolver: ({ project, contributor }) =>
        `/projects/${resolveProjectTargetPath(project)}/contributors/${resolveContributorTargetPath(contributor)}`,

    successResponseBodySchema: RETRIEVE_CONTRIBUTOR_RESPONSE_SCHEMA,
})

/**
 * Public API router definition for deleting a project contributor
 */
export const deleteContributorContract = buildDeleteRoute({
    description: 'Delete a project contributor',

    requestHeaderSchema: CONTRIBUTOR_API_BASE_HEADER_SCHEMA,

    requestPathParamsSchema: DELETE_CONTRIBUTOR_PATH_PARAMS_SCHEMA,
    pathResolver: ({ project, contributor }) =>
        `/projects/${resolveProjectTargetPath(project)}/contributors/${resolveContributorTargetPath(contributor)}`,

    successResponseBodySchema: DELETE_CONTRIBUTOR_RESPONSE_SCHEMA,
    isEmptyResponseExpected: false,
})

/**
 * Public API router definition for adding project contributors
 */
export const addContributorsContract = buildPayloadRoute({
    description: 'Add contributors to the project',

    requestHeaderSchema: CONTRIBUTOR_API_BASE_HEADER_SCHEMA,

    method: 'post',
    requestPathParamsSchema: ADD_CONTRIBUTORS_PATH_PARAMS_SCHEMA,
    pathResolver: ({ project }) => `/projects/${resolveProjectTargetPath(project)}/contributors`,
    requestBodySchema: ADD_CONTRIBUTORS_REQUEST_BODY_SCHEMA,

    successResponseBodySchema: ADD_CONTRIBUTORS_RESPONSE_SCHEMA,
})

/**
 * Public API router definition for updating project contributors
 */
export const updateContributorsContract = buildPayloadRoute({
    description: 'Update contributors to the project',

    requestHeaderSchema: CONTRIBUTOR_API_BASE_HEADER_SCHEMA,

    method: 'put',
    requestPathParamsSchema: UPDATE_CONTRIBUTORS_PATH_PARAMS_SCHEMA,
    pathResolver: ({ project, contributorId }) =>
        `/projects/${resolveProjectTargetPath(project)}/contributors/${contributorId}`,
    requestBodySchema: UPDATE_CONTRIBUTORS_REQUEST_BODY_SCHEMA,

    successResponseBodySchema: UPDATE_CONTRIBUTORS_RESPONSE_SCHEMA,
})
