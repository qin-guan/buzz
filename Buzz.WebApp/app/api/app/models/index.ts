/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { type AdditionalDataHolder, type Parsable, type ParseNode, type SerializationWriter } from '@microsoft/kiota-abstractions';

export interface BusService extends AdditionalDataHolder, Parsable {
    /**
     * Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     */
    additionalData?: Record<string, unknown>;
    /**
     * The nextBus property
     */
    nextBus?: NextBus;
    /**
     * The nextBus2 property
     */
    nextBus2?: NextBus;
    /**
     * The nextBus3 property
     */
    nextBus3?: NextBus;
    /**
     * The operator property
     */
    operator?: string;
    /**
     * The serviceNo property
     */
    serviceNo?: string;
}
export interface BusStop extends AdditionalDataHolder, Parsable {
    /**
     * Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     */
    additionalData?: Record<string, unknown>;
    /**
     * The code property
     */
    code?: string;
    /**
     * The description property
     */
    description?: string;
    /**
     * The latitude property
     */
    latitude?: number;
    /**
     * The longitude property
     */
    longitude?: number;
    /**
     * The roadName property
     */
    roadName?: string;
}
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {BusService}
 */
export function createBusServiceFromDiscriminatorValue(parseNode: ParseNode | undefined) : ((instance?: Parsable) => Record<string, (node: ParseNode) => void>) {
    return deserializeIntoBusService;
}
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {BusStop}
 */
export function createBusStopFromDiscriminatorValue(parseNode: ParseNode | undefined) : ((instance?: Parsable) => Record<string, (node: ParseNode) => void>) {
    return deserializeIntoBusStop;
}
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {NextBus}
 */
export function createNextBusFromDiscriminatorValue(parseNode: ParseNode | undefined) : ((instance?: Parsable) => Record<string, (node: ParseNode) => void>) {
    return deserializeIntoNextBus;
}
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
export function deserializeIntoBusService(busService: Partial<BusService> | undefined = {}) : Record<string, (node: ParseNode) => void> {
    return {
        "nextBus": n => { busService.nextBus = n.getObjectValue<NextBus>(createNextBusFromDiscriminatorValue); },
        "nextBus2": n => { busService.nextBus2 = n.getObjectValue<NextBus>(createNextBusFromDiscriminatorValue); },
        "nextBus3": n => { busService.nextBus3 = n.getObjectValue<NextBus>(createNextBusFromDiscriminatorValue); },
        "operator": n => { busService.operator = n.getStringValue(); },
        "serviceNo": n => { busService.serviceNo = n.getStringValue(); },
    }
}
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
export function deserializeIntoBusStop(busStop: Partial<BusStop> | undefined = {}) : Record<string, (node: ParseNode) => void> {
    return {
        "code": n => { busStop.code = n.getStringValue(); },
        "description": n => { busStop.description = n.getStringValue(); },
        "latitude": n => { busStop.latitude = n.getNumberValue(); },
        "longitude": n => { busStop.longitude = n.getNumberValue(); },
        "roadName": n => { busStop.roadName = n.getStringValue(); },
    }
}
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
export function deserializeIntoNextBus(nextBus: Partial<NextBus> | undefined = {}) : Record<string, (node: ParseNode) => void> {
    return {
        "destinationCode": n => { nextBus.destinationCode = n.getStringValue(); },
        "estimatedArrival": n => { nextBus.estimatedArrival = n.getStringValue(); },
        "feature": n => { nextBus.feature = n.getStringValue(); },
        "latitude": n => { nextBus.latitude = n.getStringValue(); },
        "load": n => { nextBus.load = n.getStringValue(); },
        "longitude": n => { nextBus.longitude = n.getStringValue(); },
        "monitored": n => { nextBus.monitored = n.getNumberValue(); },
        "originCode": n => { nextBus.originCode = n.getStringValue(); },
        "type": n => { nextBus.type = n.getStringValue(); },
        "visitNumber": n => { nextBus.visitNumber = n.getStringValue(); },
    }
}
export interface NextBus extends AdditionalDataHolder, Parsable {
    /**
     * Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     */
    additionalData?: Record<string, unknown>;
    /**
     * The destinationCode property
     */
    destinationCode?: string;
    /**
     * The estimatedArrival property
     */
    estimatedArrival?: string;
    /**
     * The feature property
     */
    feature?: string;
    /**
     * The latitude property
     */
    latitude?: string;
    /**
     * The load property
     */
    load?: string;
    /**
     * The longitude property
     */
    longitude?: string;
    /**
     * The monitored property
     */
    monitored?: number;
    /**
     * The originCode property
     */
    originCode?: string;
    /**
     * The type property
     */
    type?: string;
    /**
     * The visitNumber property
     */
    visitNumber?: string;
}
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
export function serializeBusService(writer: SerializationWriter, busService: Partial<BusService> | undefined = {}) : void {
    writer.writeObjectValue<NextBus>("nextBus", busService.nextBus, serializeNextBus);
    writer.writeObjectValue<NextBus>("nextBus2", busService.nextBus2, serializeNextBus);
    writer.writeObjectValue<NextBus>("nextBus3", busService.nextBus3, serializeNextBus);
    writer.writeStringValue("operator", busService.operator);
    writer.writeStringValue("serviceNo", busService.serviceNo);
    writer.writeAdditionalData(busService.additionalData);
}
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
export function serializeBusStop(writer: SerializationWriter, busStop: Partial<BusStop> | undefined = {}) : void {
    writer.writeStringValue("code", busStop.code);
    writer.writeStringValue("description", busStop.description);
    writer.writeNumberValue("latitude", busStop.latitude);
    writer.writeNumberValue("longitude", busStop.longitude);
    writer.writeStringValue("roadName", busStop.roadName);
    writer.writeAdditionalData(busStop.additionalData);
}
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
export function serializeNextBus(writer: SerializationWriter, nextBus: Partial<NextBus> | undefined = {}) : void {
    writer.writeStringValue("destinationCode", nextBus.destinationCode);
    writer.writeStringValue("estimatedArrival", nextBus.estimatedArrival);
    writer.writeStringValue("feature", nextBus.feature);
    writer.writeStringValue("latitude", nextBus.latitude);
    writer.writeStringValue("load", nextBus.load);
    writer.writeStringValue("longitude", nextBus.longitude);
    writer.writeNumberValue("monitored", nextBus.monitored);
    writer.writeStringValue("originCode", nextBus.originCode);
    writer.writeStringValue("type", nextBus.type);
    writer.writeStringValue("visitNumber", nextBus.visitNumber);
    writer.writeAdditionalData(nextBus.additionalData);
}
/* tslint:enable */
/* eslint-enable */
