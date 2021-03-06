/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

import {
  request,
  IRequestOptions,
  IGenerateTokenParams,
  ITokenRequestOptions,
  NODEJS_DEFAULT_REFERER_HEADER
} from "@esri/arcgis-rest-request";

export interface IGenerateTokenResponse {
  token: string;
  expires: number;
  ssl: boolean;
}

export function generateToken(
  url: string,
  requestOptions: IGenerateTokenParams | ITokenRequestOptions
): Promise<IGenerateTokenResponse> {
  // TODO: remove union type and type guard next breaking change and just expect IGenerateTokenParams
  const options: IRequestOptions = (requestOptions as ITokenRequestOptions)
    .params
    ? (requestOptions as IRequestOptions)
    : { params: requestOptions };

  /* istanbul ignore else */
  if (
    typeof window !== "undefined" &&
    window.location &&
    window.location.host
  ) {
    options.params.referer = window.location.host;
  } else {
    options.params.referer = NODEJS_DEFAULT_REFERER_HEADER;
  }

  return request(url, options);
}
