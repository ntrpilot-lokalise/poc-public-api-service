import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { listContributorsContract } from '../schema/contributorsApiContracts.js'
import { buildFastifyNoPayloadRoute } from '@lokalise/fastify-api-contracts'
import type { ApiBeta1InjectableDependencies } from '../../ApiBeta1Module.js'
import { LokalisePublicApiFactory } from '../../common/services/LokalisePublicApiFactory.js'

type ContributorsControllerContractsType = typeof ContributorsController.contracts

export class ContributorsController extends AbstractController<ContributorsControllerContractsType> {
    static contracts = {
        listContributors: listContributorsContract,
        // getContributor: retrieveContributorContract,
        // deleteContributor: deleteContributorContract,
        // addContributor: addContributorsContract,
        // updateContributor: updateContributorsContract,
    } as const

    private readonly lokalisePublicApiFactory: LokalisePublicApiFactory

    constructor(deps: ApiBeta1InjectableDependencies) {
        super()

        this.lokalisePublicApiFactory = deps.lokalisePublicApiFactory
    }

    private listContributors = buildFastifyNoPayloadRoute(
        ContributorsController.contracts.listContributors,
        async (req, res) => {
            const result =
                await this.lokalisePublicApiFactory
                    .fromHeaders(req.headers)
                    .contributors()
                    .list({
                        project_id: req.params.projectId,
                    })

            result.items
        },
    )

    override buildRoutes(): BuildRoutesReturnType<ContributorsControllerContractsType> {
        return {
            listContributors: this.listContributors,
        }
    }
}