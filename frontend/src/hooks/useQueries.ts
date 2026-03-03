import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ServiceCategory, ServiceType, type Service, type Appointment, AppointmentStatus } from '../backend';

// ── Services ──────────────────────────────────────────────────────────────────

export function useGetAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServicesByCategory(category: ServiceCategory) {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ['services', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServicesByType(serviceType: ServiceType) {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ['services', 'type', serviceType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicesByType(serviceType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      name: string;
      description: string;
      category: ServiceCategory;
      serviceType: ServiceType;
      price: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createService(params.id, params.name, params.description, params.category, params.serviceType, params.price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

// ── Appointments ──────────────────────────────────────────────────────────────

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      clientName: string;
      phoneNumber: string;
      animalType: string;
      category: ServiceCategory;
      serviceId: string;
      preferredDate: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.bookAppointment(
        params.id,
        params.clientName,
        params.phoneNumber,
        params.animalType,
        params.category,
        params.serviceId,
        params.preferredDate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; status: AppointmentStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateAppointmentStatus(params.id, params.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useCancelAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.cancelAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
