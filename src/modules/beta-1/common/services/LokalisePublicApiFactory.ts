import { LokaliseApi } from '@lokalise/node-api'
import { type AuthenticationHeaders, isApuTokenAuthHeader, isAuthorizationHeader } from '../schema/sharedShemas.js'
import { AuthFailedError } from '@lokalise/node-core'

export class LokalisePublicApiFactory {
    fromHeaders(headers: AuthenticationHeaders): LokaliseApi {
        let header: string | undefined
        if (isAuthorizationHeader(headers)) header = headers.authorization
        if (isApuTokenAuthHeader(headers)) header = headers['x-api-token']

        if (!header) {
            throw new AuthFailedError({ message: 'No authorization header found.' })
        }

        const apiKey = header.startsWith('Bearer ')
            ? header.slice(7)
            : header

        return this.fromToken(apiKey)
    }

    fromToken(token: string): LokaliseApi {
        return new LokaliseApi({
            apiKey: token,
        })
    }
}