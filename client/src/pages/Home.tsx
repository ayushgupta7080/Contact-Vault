import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, Search, BookOpen } from "lucide-react";
import { useState } from "react";
import { api, type Contact } from "@shared/routes";
import { useContacts, useCreateContact, useDeleteContact } from "@/hooks/use-contacts";
import { ContactCard } from "@/components/ContactCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: contacts, isLoading } = useContacts();
  const createContact = useCreateContact();
  const deleteContact = useDeleteContact();

  const form = useForm<Contact>({
    resolver: zodResolver(api.contacts.create.input),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: Contact) => {
    createContact.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-foreground">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-border mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary tracking-tight">
            Rolodex
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto font-light">
            A minimalist contact manager for your personal network.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[400px,1fr] gap-8 md:gap-12 items-start">
          {/* Add Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8 rounded-2xl sticky top-8"
          >
            <div className="mb-6 pb-6 border-b border-border/40">
              <h2 className="text-xl font-display font-semibold mb-1">New Contact</h2>
              <p className="text-sm text-muted-foreground">Add details below to grow your network.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground/70">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="input-clean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground/70">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@example.com" className="input-clean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground/70">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" className="input-clean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground/70">Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Met at the design conference..." 
                          className="bg-transparent border-b-2 border-border px-0 rounded-none focus:border-primary focus:ring-0 focus:outline-none resize-none min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={createContact.isPending}
                  className="w-full h-12 rounded-xl text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 mt-4"
                >
                  {createContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Contacts
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-display font-medium">
                Your Network
                <span className="ml-3 text-sm font-sans font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {contacts?.length || 0}
                </span>
              </h2>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search contacts..."
                  className="pl-9 bg-white border-transparent shadow-sm focus:border-primary/20 hover:bg-white/50 transition-all rounded-xl"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/60 rounded-2xl bg-secondary/10">
                <div className="bg-secondary p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-1">No contacts found</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {searchTerm ? "Try adjusting your search terms." : "Start by adding your first contact using the form."}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onDelete={(id) => deleteContact.mutate(id)}
                      isDeleting={deleteContact.isPending}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
