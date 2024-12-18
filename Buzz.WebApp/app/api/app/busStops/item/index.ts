/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { ServicesRequestBuilderRequestsMetadata, type ServicesRequestBuilder } from './services/';
// @ts-ignore
import { type BaseRequestBuilder, type KeysToExcludeForNavigationMetadata, type NavigationMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /BusStops/{Code}
 */
export interface WithCodeItemRequestBuilder extends BaseRequestBuilder<WithCodeItemRequestBuilder> {
    /**
     * The Services property
     */
    get services(): ServicesRequestBuilder;
}
/**
 * Uri template for the request builder.
 */
export const WithCodeItemRequestBuilderUriTemplate = "{+baseurl}/BusStops/{Code}";
/**
 * Metadata for all the navigation properties in the request builder.
 */
export const WithCodeItemRequestBuilderNavigationMetadata: Record<Exclude<keyof WithCodeItemRequestBuilder, KeysToExcludeForNavigationMetadata>, NavigationMetadata> = {
    services: {
        requestsMetadata: ServicesRequestBuilderRequestsMetadata,
    },
};
/* tslint:enable */
/* eslint-enable */
