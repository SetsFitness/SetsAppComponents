import {err, ifDebug, log, lambdaFunctionName, getEnvironmentType} from "../../Constants";
import TestHelper from "../testing/TestHelper";
import {debugAlert} from "../logic/DebuggingHelper";
import {getAWS} from "../../AppConfig";

// Prepare to call Lambda function
let AWS = getAWS();
let lambda = new AWS.Lambda({region: 'us-east-1'});

/**
 * This is the static class that allows us to invoke the AWS Lambda function using the predefined JSON structure.
 */
class Lambda {
  // ======================================================================================================
  // Lambda Low-Level Functions ~
  // ======================================================================================================

  /**
   * Gets the Create Request JSON attribute name from the given item type.
   *
   * @param {string} itemType The type of the item to send a create request for.
   * @return {string} The name of the payload attribute to use for the request.
   */
  static getCreateRequestName = itemType => "create" + itemType + "Request";

  /**
   * Creates an item in the database with a given create request, which is just a value JSON for attributes.
   *
   * @param {string} fromID The user ID that is invoking this Lambda request.
   * @param {string} itemType The type of the item to create.
   * @param {{}} createRequest The create request JSON to send for creation.
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static create(fromID, itemType, createRequest, successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      fromID: fromID ? fromID : "unauthenticated",
      action: "CREATE",
      itemType: itemType,
      environmentType: getEnvironmentType(),
      [Lambda.getCreateRequestName(itemType)]: createRequest,
    }, successHandler, failureHandler);
  }

  /**
   * Indicates to the database Lambda function that an attribute should be set to a specific value in an object.
   *
   * @param {string} fromID The user ID that is invoking this Lambda request.
   * @param {string} objectID The ID of the object to update in the database.
   * @param {string} objectItemType The item type of the object to update.
   * @param {string} attributeName The name of the object's attribute.
   * @param {*} attributeValue The value to set to the object's attribute.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateSetAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      fromID: fromID ? fromID : "unauthenticated",
      action: "UPDATESET",
      itemType: objectItemType,
      identifiers: [
        objectID
      ],
      attributeName: attributeName,
      attributeValues: [
        attributeValue
      ],
      environmentType: getEnvironmentType()
    }, successHandler, failureHandler);
  }

  /**
   * Indicates to the database Lambda function that a value should be added to an object's set (array) attribute.
   *
   * @param {string} fromID The user ID that is invoking this Lambda request.
   * @param {string} objectID The ID of the object to update in the database.
   * @param {string} objectItemType The item type of the object to update.
   * @param {string} attributeName The name of the object's set attribute.
   * @param {*} attributeValue The value to add to the object's set attribute.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateAddToAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      fromID: fromID ? fromID : "unauthenticated",
      action: "UPDATEADD",
      itemType: objectItemType,
      identifiers: [
        objectID
      ],
      attributeName,
      attributeValues: [
        attributeValue
      ],
      environmentType: getEnvironmentType()
    }, successHandler, failureHandler);
  }

  /**
   * Indicates to the database Lambda function that a value should be removed from an object's set (array) attribute.
   *
   * @param {string} fromID The user ID that is invoking this Lambda request.
   * @param {string} objectID The ID of the object to update in the database.
   * @param {string} objectItemType The item type of the object to update.
   * @param {string} attributeName The name of the object's set attribute.
   * @param {*} attributeValue The value to remove from the object's set attribute.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateRemoveFromAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      fromID: fromID ? fromID : "unauthenticated",
      action: "UPDATEREMOVE",
      itemType: objectItemType,
      identifiers: [
        objectID
      ],
      attributeName,
      attributeValues: [
        attributeValue
      ],
      environmentType: getEnvironmentType()
    }, successHandler, failureHandler);
  }

  /**
   * Handles miscellaneous actions in the Lambda function that have no other action to go with it.
   * Very special cases.
   *
   * @param {string} fromID The user ID that is invoking this Lambda request.
   * @param {string} objectID The ID of the object to help process.
   * @param {string} objectItemType The item type of the object to help process.
   * @param {string} secondaryIdentifier The secondary identifier to help process.
   * @param {string} specifyAction The specific action to process.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static process(fromID, objectID, objectItemType, secondaryIdentifier, specifyAction, successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      fromID: fromID ? fromID : "unauthenticated",
      action: "PROCESS",
      itemType: objectItemType,
      identifiers: [
        objectID
      ],
      secondaryIdentifier,
      environmentType: getEnvironmentType()
    }, successHandler, failureHandler);
  }

  /**
   * Indicates to the database Lambda function that an object should be deleted.
   *
   * @param {string} fromID The user ID that is invoking this Lambda request.
   * @param {string} objectID The ID of the object to delete in the database.
   * @param {string} objectItemType The item type of the object to delete.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static delete(fromID, objectID, objectItemType, successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      fromID: fromID ? fromID : "unauthenticated",
      action: "DELETE",
      itemType: objectItemType,
      identifiers: [
        objectID
      ],
      environmentType: getEnvironmentType()
    }, successHandler, failureHandler)
  }

  /**
   * Sends a very quick lambda invocation to the database Lambda function in an attempt to reduce slow start times.
   *
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static ping(successHandler, failureHandler) {
    return Lambda.invokeDatabaseLambda({
      action: "PING"
    }, successHandler, failureHandler);
  }

  // Specific Lambda Function Calls

  static invokeDatabaseLambda(payload, successHandler, failureHandler) {
    return Lambda.invokeLambda(lambdaFunctionName, payload, successHandler, failureHandler);
  }

  // static invokePaymentLambda(payload, successHandler, failureHandler) {
  //     return this.invokeLambda("VastusPaymentLambdaFunction", payload, successHandler, failureHandler);
  // }
  // static invokeFirebaseLambda(payload, successHandler, failureHandler) {
  //     return this.invokeLambda("VastusFirebaseTokenFunction", payload, successHandler, failureHandler);
  // }

  /**
   * Invokes an AWS Lambda function from the Lambda console using a specific payload.
   *
   * @param {string} functionName The name of the function from the Lambda console to invoke.
   * @param {{}} payload The JSON payload to send through lambda.
   * @param {function({secretKey: string, timestamp: string, data: *})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static invokeLambda(functionName, payload, successHandler, failureHandler) {
    // log&&console.log("Sending lambda payload: " + JSON.stringify(payload));
    log && console.log("Sending lambda payload: " + JSON.stringify(payload));
    const request = {FunctionName: functionName, Payload: JSON.stringify(payload)};
    if (TestHelper.ifTesting && successHandler) {
      successHandler(null);
    }
    TestHelper.ifTesting || lambda.invoke(request, (error, data) => {
      if (error) {
        err && console.error(error);
        err && console.error("Lambda failure: " + JSON.stringify(error));
        if (ifDebug) {
          console.log("Lambda failure: " + JSON.stringify(error))
        }
        if (failureHandler) {
          failureHandler(error);
        }
      } else if (data.Payload) {
        //log&&console.log(data.Payload);
        const payload = JSON.parse(data.Payload);
        if (payload.errorMessage) {
          err && console.error("Error from Lambda!: " + JSON.stringify(payload));
          err && console.error(payload.errorMessage);
          if (failureHandler) {
            failureHandler(payload.errorMessage);
          }
        } else {
          log && console.log("Successfully invoked lambda function! Received: " + JSON.stringify(payload));
          debugAlert("Successful Lambda, received " + JSON.stringify(payload));
          if (successHandler) {
            successHandler(payload);
          }
        }
      } else {
        err && console.error("Weird error: payload returned with nothing...");
        if (failureHandler) {
          failureHandler("Payload returned with null");
        }
      }
    });
    if (TestHelper.ifTesting) {
      return payload;
    }
  }
}

export default Lambda;