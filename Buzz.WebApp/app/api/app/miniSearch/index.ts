/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { type BaseRequestBuilder, type Parsable, type ParsableFactory, type RequestConfiguration, type RequestInformation, type RequestsMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /MiniSearch
 */
export interface MiniSearchRequestBuilder extends BaseRequestBuilder<MiniSearchRequestBuilder> {
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
     get(requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<ArrayBuffer | undefined>;
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export const MiniSearchRequestBuilderUriTemplate = "{+baseurl}/MiniSearch";
/**
 * Metadata for all the requests in the request builder.
 */
export const MiniSearchRequestBuilderRequestsMetadata: RequestsMetadata = {
    get: {
        uriTemplate: MiniSearchRequestBuilderUriTemplate,
        adapterMethodName: "sendPrimitive",
        responseBodyFactory:  "ArrayBuffer",
    },
};
/* tslint:enable */
/* eslint-enable */