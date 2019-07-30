import { Injectable, ErrorHandler } from '@angular/core';

/**
 * @type {Injectable}
 * @description Service to handle exceptions and error
 */
@Injectable()
export class ExceptionHandlerService implements ErrorHandler {
  /**
   * Constructor of the Service.
   */
  constructor() {}

  /**
   * All the exceptions and errors will be handled by this function
   * @param error
   */
  handleError(error: Error) {
    console.log(error);
    // send the error to server
    // integrate logging API to print error on server in case of production
  }
}
