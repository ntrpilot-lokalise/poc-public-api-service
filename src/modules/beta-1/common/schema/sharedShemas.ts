import { z } from 'zod'

export const AUTHORIZATION_HEADER_SCHEMA = z.union([
    z.object({ authorization: z.string() }),
    z.object({ AUTHORIZATION: z.string() }).transform(({ AUTHORIZATION }) => ({ authorization: AUTHORIZATION })),
])

export const APU_TOKEN_AUTH_HEADER_SCHEMA = z.union([
    z.object({ 'x-api-token': z.string() }),
    z.object({ 'X-API-Token': z.string() }).transform(({ 'X-API-Token': XApiToken }) => ({ 'x-api-token': XApiToken })),
    z.object({ 'X-Api-Token': z.string() }).transform(({ 'X-Api-Token': XApiToken }) => ({ 'x-api-token': XApiToken })),
    z.object({ 'X-API-TOKEN': z.string() }).transform(({ 'X-API-TOKEN': XApiToken }) => ({ 'x-api-token': XApiToken })),
])

export const AUTHENTICATION_HEADERS_SCHEMA = z.union([
    AUTHORIZATION_HEADER_SCHEMA,
    APU_TOKEN_AUTH_HEADER_SCHEMA,
])

type AuthorizationHeader = z.infer<typeof AUTHORIZATION_HEADER_SCHEMA>
type ApuTokenAuthHeader = z.infer<typeof APU_TOKEN_AUTH_HEADER_SCHEMA>
export type AuthenticationHeaders = z.infer<typeof AUTHENTICATION_HEADERS_SCHEMA>

export const isAuthorizationHeader = (test: AuthenticationHeaders): test is AuthorizationHeader => 'authorization' in test
export const isApuTokenAuthHeader = (test: AuthenticationHeaders): test is ApuTokenAuthHeader => 'x-api-token' in test


export const API_PLUGIN_HEADER_SCHEMA = z.union([
    z.object({ 'X-Lokalise-Plugin': z.string() }),
    z.object({ 'x-lokalise-plugin': z.string() }),
    z.object({ 'X-LOKALISE-PLUGIN': z.string() }),
])

export type ApiPluginHeader = z.infer<typeof API_PLUGIN_HEADER_SCHEMA>

export const BASE_API_ENDPOINT_HEADER_SCHEMA =
    AUTHENTICATION_HEADERS_SCHEMA.and(API_PLUGIN_HEADER_SCHEMA)

export type BaseApiEndpointHeader = z.infer<typeof BASE_API_ENDPOINT_HEADER_SCHEMA>
