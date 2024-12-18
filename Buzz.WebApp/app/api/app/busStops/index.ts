/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { createBusStopFromDiscriminatorValue, type BusStop } from '../models/';
// @ts-ignore
import { type WithCodeItemRequestBuilder, WithCodeItemRequestBuilderNavigationMetadata } from './item/';
// @ts-ignore
import { type BaseRequestBuilder, type KeysToExcludeForNavigationMetadata, type NavigationMetadata, type Parsable, type ParsableFactory, type RequestConfiguration, type RequestInformation, type RequestsMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /BusStops
 */
export interface BusStopsRequestBuilder extends BaseRequestBuilder<BusStopsRequestBuilder> {
    /**
     * Gets an item from the ApiSdk.BusStops.item collection
     * @param code Unique identifier of the item
     * @returns {WithCodeItemRequestBuilder}
     */
     byCode(code: string) : WithCodeItemRequestBuilder;
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<BusStop[]>}
     */
     get(requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<BusStop[] | undefined>;
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export const BusStopsRequestBuilderUriTemplate = "{+baseurl}/BusStops";
/**
 * Metadata for all the navigation properties in the request builder.
 */
export const BusStopsRequestBuilderNavigationMetadata: Record<Exclude<keyof BusStopsRequestBuilder, KeysToExcludeForNavigationMetadata>, NavigationMetadata> = {
    byCode: {
        navigationMetadata: WithCodeItemRequestBuilderNavigationMetadata,
        pathParametersMappings: ["Code"],
    },
};
/**
 * Metadata for all the requests in the request builder.
 */
export const BusStopsRequestBuilderRequestsMetadata: RequestsMetadata = {
    get: {
        uriTemplate: BusStopsRequestBuilderUriTemplate,
        responseBodyContentType: "application/json",
        adapterMethodName: "sendCollection",
        responseBodyFactory:  createBusStopFromDiscriminatorValue,
    },
};
/* tslint:enable */
/* eslint-enable */
