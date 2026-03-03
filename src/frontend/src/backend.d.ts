import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Service {
    id: string;
    serviceType: ServiceType;
    name: string;
    description: string;
    category: ServiceCategory;
    price: bigint;
}
export interface Appointment {
    id: string;
    status: AppointmentStatus;
    clientName: string;
    preferredDate: Time;
    category: ServiceCategory;
    serviceId: string;
    phoneNumber: string;
    animalType: string;
}
export interface UserProfile {
    name: string;
    address: string;
    phoneNumber: string;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ServiceCategory {
    pet = "pet",
    birdsPoultry = "birdsPoultry",
    smallRuminant = "smallRuminant",
    largeRuminant = "largeRuminant"
}
export enum ServiceType {
    vaccination = "vaccination",
    other = "other",
    treatment = "treatment",
    surgery = "surgery",
    consultation = "consultation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(id: string, clientName: string, phoneNumber: string, animalType: string, category: ServiceCategory, serviceId: string, preferredDate: Time): Promise<void>;
    cancelAppointment(id: string): Promise<void>;
    createService(id: string, name: string, description: string, category: ServiceCategory, serviceType: ServiceType, price: bigint): Promise<void>;
    deleteService(id: string): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllServices(): Promise<Array<Service>>;
    getAppointment(id: string): Promise<Appointment>;
    getAppointmentsByStatus(status: AppointmentStatus): Promise<Array<Appointment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getService(id: string): Promise<Service>;
    getServicesByCategory(category: ServiceCategory): Promise<Array<Service>>;
    getServicesByType(serviceType: ServiceType): Promise<Array<Service>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAppointmentStatus(id: string, newStatus: AppointmentStatus): Promise<void>;
    updateService(id: string, name: string, description: string, category: ServiceCategory, serviceType: ServiceType, price: bigint): Promise<void>;
}
