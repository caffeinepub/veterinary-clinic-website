import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
    phoneNumber : Text;
    address : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Types
  type ServiceCategory = {
    #largeRuminant;
    #smallRuminant;
    #pet;
    #birdsPoultry;
  };
  type ServiceType = { #treatment; #vaccination; #consultation; #surgery; #other };

  type Service = {
    id : Text;
    name : Text;
    description : Text;
    category : ServiceCategory;
    serviceType : ServiceType;
    price : Nat;
  };

  module Service {
    public func compare(s1 : Service, s2 : Service) : Order.Order {
      Text.compare(s1.name, s2.name);
    };
  };

  type AppointmentStatus = { #pending; #confirmed; #completed; #cancelled };

  type Appointment = {
    id : Text;
    clientName : Text;
    phoneNumber : Text;
    animalType : Text;
    category : ServiceCategory;
    serviceId : Text;
    preferredDate : Time.Time;
    status : AppointmentStatus;
  };

  // Actor state
  let services = Map.empty<Text, Service>();
  let appointments = Map.empty<Text, Appointment>();

  // Service Operations — admin only
  public shared ({ caller }) func createService(id : Text, name : Text, description : Text, category : ServiceCategory, serviceType : ServiceType, price : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create services");
    };
    let service : Service = {
      id;
      name;
      description;
      category;
      serviceType;
      price;
    };
    services.add(id, service);
  };

  // Public read — no auth required
  public query ({ caller }) func getService(id : Text) : async Service {
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  public query ({ caller }) func getServicesByCategory(category : ServiceCategory) : async [Service] {
    services.values()
      .toArray()
      .filter(
        func(service) {
          service.category == category;
        }
      )
      .sort();
  };

  public query ({ caller }) func getServicesByType(serviceType : ServiceType) : async [Service] {
    services.values()
      .toArray()
      .filter(
        func(service) {
          service.serviceType == serviceType;
        }
      )
      .sort();
  };

  // Admin-only mutations
  public shared ({ caller }) func updateService(id : Text, name : Text, description : Text, category : ServiceCategory, serviceType : ServiceType, price : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : Service = {
          id;
          name;
          description;
          category;
          serviceType;
          price;
        };
        services.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        services.remove(id);
      };
    };
  };

  // Appointment Operations
  // bookAppointment is open to any caller (guests can book)
  public shared ({ caller }) func bookAppointment(
    id : Text,
    clientName : Text,
    phoneNumber : Text,
    animalType : Text,
    category : ServiceCategory,
    serviceId : Text,
    preferredDate : Time.Time,
  ) : async () {
    let appointment : Appointment = {
      id;
      clientName;
      phoneNumber;
      animalType;
      category;
      serviceId;
      preferredDate;
      status = #pending;
    };
    appointments.add(id, appointment);
  };

  // Appointment reads — admin only
  public query ({ caller }) func getAppointment(id : Text) : async Appointment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view appointments");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };
    appointments.values().toArray();
  };

  public query ({ caller }) func getAppointmentsByStatus(status : AppointmentStatus) : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can filter appointments");
    };
    appointments.values()
      .toArray()
      .filter(
        func(appointment) {
          appointment.status == status;
        }
      );
  };

  // Appointment mutations — admin only
  public shared ({ caller }) func updateAppointmentStatus(id : Text, newStatus : AppointmentStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update appointment status");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment : Appointment = {
          id = appointment.id;
          clientName = appointment.clientName;
          phoneNumber = appointment.phoneNumber;
          animalType = appointment.animalType;
          category = appointment.category;
          serviceId = appointment.serviceId;
          preferredDate = appointment.preferredDate;
          status = newStatus;
        };
        appointments.add(id, updatedAppointment);
      };
    };
  };

  public shared ({ caller }) func cancelAppointment(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can cancel appointments");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment : Appointment = {
          id = appointment.id;
          clientName = appointment.clientName;
          phoneNumber = appointment.phoneNumber;
          animalType = appointment.animalType;
          category = appointment.category;
          serviceId = appointment.serviceId;
          preferredDate = appointment.preferredDate;
          status = #cancelled;
        };
        appointments.add(id, updatedAppointment);
      };
    };
  };
};
