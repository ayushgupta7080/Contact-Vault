import { motion } from "framer-motion";
import { Trash2, Phone, Mail, MessageSquare } from "lucide-react";
import type { Contact } from "@shared/routes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ContactCardProps {
  contact: Contact & { id: number };
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function ContactCard({ contact, onDelete, isDeleting }: ContactCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-xl p-6 shadow-sm border border-border/40 hover:shadow-lg hover:border-border transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-background shadow-sm bg-secondary text-secondary-foreground">
            <AvatarFallback className="font-display font-medium text-lg">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
              {contact.name}
            </h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Contact
            </p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={isDeleting}
              className="p-2 -mr-2 rounded-full text-muted-foreground/50 hover:text-destructive hover:bg-destructive/5 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Contact</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {contact.name} from your contacts? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(contact.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mt-6 space-y-3">
        <a 
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
        >
          <div className="p-2 rounded-lg bg-secondary/50 group-hover/link:bg-primary/5 transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <span className="truncate">{contact.email}</span>
        </a>
        
        <a 
          href={`tel:${contact.phone}`}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
        >
          <div className="p-2 rounded-lg bg-secondary/50 group-hover/link:bg-primary/5 transition-colors">
            <Phone className="w-4 h-4" />
          </div>
          <span>{contact.phone}</span>
        </a>

        {contact.message && (
          <div className="flex items-start gap-3 text-sm text-muted-foreground mt-4 pt-4 border-t border-border/40">
            <div className="p-2 rounded-lg bg-secondary/50 shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <p className="italic leading-relaxed text-muted-foreground/80 line-clamp-3">
              "{contact.message}"
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
