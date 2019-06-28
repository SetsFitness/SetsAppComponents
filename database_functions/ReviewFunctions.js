import Lambda from "../api/Lambda";

const itemType = "Review";

// TODO Revisit once we re-implement this potentially

/**
 * Holds all the potential properly formatted Lambda functions for Reviews.
 */
class ReviewFunctions {
  // ======================================================================================================
  // Review High-Level Functions ~
  // ======================================================================================================

  // Create Functions ============================================================

  // Update Functions ============================================================

  // ======================================================================================================
  // Review Low-Level Functions ~
  // ======================================================================================================
  static create() {
    // TODO Implement
    console.log("Not implemented...");
  }

  static updateAdd(fromID, reviewID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateAddToAttribute(fromID, reviewID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateRemove(fromID, reviewID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateRemoveFromAttribute(fromID, reviewID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateSet(fromID, reviewID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateSetAttribute(fromID, reviewID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static delete(fromID, reviewID, successHandler, failureHandler) {
    return Lambda.delete(fromID, reviewID, itemType, successHandler, failureHandler);
  }
}

export default ReviewFunctions;
