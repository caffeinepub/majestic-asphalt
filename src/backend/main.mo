import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type ServiceType = {
    #drivewayPaving;
    #parkingLotPaving;
    #asphaltRepair;
    #sealcoating;
    #lineStriping;
  };

  module ServiceType {
    public func fromText(text : Text) : ServiceType {
      switch (text) {
        case ("Driveway Paving") { #drivewayPaving };
        case ("Parking Lot Paving") { #parkingLotPaving };
        case ("Asphalt Repair") { #asphaltRepair };
        case ("Sealcoating") { #sealcoating };
        case ("Line Striping") { #lineStriping };
        case (_) { Runtime.trap("Invalid service type: " # text) };
      };
    };
  };

  type QuoteId = Nat;

  type QuoteRequest = {
    id : QuoteId;
    name : Text;
    phone : Text;
    email : Text;
    serviceType : ServiceType;
    message : Text;
    timestamp : Int;
  };

  module QuoteRequest {
    public func compareByNewestFirst(req1 : QuoteRequest, req2 : QuoteRequest) : Order.Order {
      Int.compare(req2.timestamp, req1.timestamp);
    };
  };

  var nextId : QuoteId = 1;
  let quoteRequests = Map.empty<QuoteId, QuoteRequest>();

  public shared ({ caller }) func submitQuoteRequest(
    name : Text,
    phone : Text,
    email : Text,
    serviceTypeText : Text,
    message : Text,
  ) : async () {
    let serviceType = ServiceType.fromText(serviceTypeText);

    let quote : QuoteRequest = {
      id = nextId;
      name;
      phone;
      email;
      serviceType;
      message;
      timestamp = Time.now();
    };

    quoteRequests.add(nextId, quote);
    nextId += 1;
  };

  public query ({ caller }) func getAllQuoteRequests() : async [QuoteRequest] {
    quoteRequests.values().toArray().sort(QuoteRequest.compareByNewestFirst);
  };
};
