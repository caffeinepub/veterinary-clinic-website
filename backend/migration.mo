import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type OldServiceCategory = {
    #largeRuminant;
    #smallRuminant;
    #pet;
  };

  type OldService = {
    id : Text;
    name : Text;
    description : Text;
    category : OldServiceCategory;
    serviceType : { #treatment; #vaccination; #consultation; #surgery; #other };
    price : Nat;
  };

  type OldAppointment = {
    id : Text;
    clientName : Text;
    phoneNumber : Text;
    animalType : Text;
    category : OldServiceCategory;
    serviceId : Text;
    preferredDate : Time.Time;
    status : { #pending; #confirmed; #completed; #cancelled };
  };

  type OldActor = {
    services : Map.Map<Text, OldService>;
    appointments : Map.Map<Text, OldAppointment>;
  };

  type NewServiceCategory = {
    #largeRuminant;
    #smallRuminant;
    #pet;
    #birdsPoultry;
  };

  type NewService = {
    id : Text;
    name : Text;
    description : Text;
    category : NewServiceCategory;
    serviceType : { #treatment; #vaccination; #consultation; #surgery; #other };
    price : Nat;
  };

  type NewAppointment = {
    id : Text;
    clientName : Text;
    phoneNumber : Text;
    animalType : Text;
    category : NewServiceCategory;
    serviceId : Text;
    preferredDate : Time.Time;
    status : { #pending; #confirmed; #completed; #cancelled };
  };

  type NewActor = {
    services : Map.Map<Text, NewService>;
    appointments : Map.Map<Text, NewAppointment>;
  };

  func convertCategory(oldCat : OldServiceCategory) : NewServiceCategory {
    switch (oldCat) {
      case (#largeRuminant) { #largeRuminant };
      case (#smallRuminant) { #smallRuminant };
      case (#pet) { #pet };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newServices = old.services.map<Text, OldService, NewService>(
      func(_id, oldService) {
        {
          oldService with
          category = convertCategory(oldService.category);
        };
      }
    );

    let newAppointments = old.appointments.map<Text, OldAppointment, NewAppointment>(
      func(_id, oldAppointment) {
        {
          oldAppointment with
          category = convertCategory(oldAppointment.category);
        };
      }
    );
    {
      services = newServices;
      appointments = newAppointments;
    };
  };
};
