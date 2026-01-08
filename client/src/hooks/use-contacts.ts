import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Contact } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useContacts() {
  const { toast } = useToast();

  return useQuery({
    queryKey: [api.contacts.list.path],
    queryFn: async () => {
      const res = await fetch(api.contacts.list.path);
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error fetching contacts",
          description: "Could not load your contact list.",
        });
        throw new Error("Failed to fetch contacts");
      }
      return api.contacts.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Contact) => {
      // Validate with schema first
      const validated = api.contacts.create.input.parse(data);
      
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contacts.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create contact");
      }
      return api.contacts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.contacts.list.path] });
      toast({
        title: "Contact added",
        description: "Successfully added to your address book.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to add contact",
        description: error.message,
      });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.contacts.delete.path, { id });
      const res = await fetch(url, {
        method: api.contacts.delete.method,
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Contact not found");
        }
        throw new Error("Failed to delete contact");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.contacts.list.path] });
      toast({
        title: "Contact deleted",
        description: "The contact has been removed.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}
