import type { CommonDependencies } from '../../infrastructure/CommonModule.js'
import {
    AbstractModule,
    asControllerClass, asServiceClass,
    type DependencyInjectionOptions,
    type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import { undefined } from 'zod'
import { ContributorsController } from './contributors/controllers/ContributorsController.js'
import { LokalisePublicApiFactory } from './common/services/LokalisePublicApiFactory.js'

export type ApiBeta1ModuleDependencies = {
    lokalisePublicApiFactory: LokalisePublicApiFactory
}

export type ApiBeta1InjectableDependencies = ApiBeta1ModuleDependencies & CommonDependencies

export class ApiBeta1Module extends AbstractModule<ApiBeta1ModuleDependencies> {
    resolveControllers(): MandatoryNameAndRegistrationPair<unknown> {
        return {
            contributorsController: asControllerClass(ContributorsController),
        }
    }

    resolveDependencies(diOptions: DependencyInjectionOptions, externalDependencies: never): MandatoryNameAndRegistrationPair<ApiBeta1ModuleDependencies> {
        return {
            lokalisePublicApiFactory: asServiceClass(LokalisePublicApiFactory)
        }
    }
}