'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWizardStore } from '@/store/use-wizard-store';
import { teammateAnimation } from '@/components/wizard/animations';
import {
  teammateSchema,
  type TeammateFormValues,
} from '@/schemas/wizard-schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function InviteTeammates() {
  const { teammates, addTeammate, removeTeammate } = useWizardStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TeammateFormValues>({
    resolver: zodResolver(teammateSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: TeammateFormValues) => {
    setIsSubmitting(true);

    if (teammates.includes(values.email)) {
      form.setError('email', {
        type: 'manual',
        message: 'This email has already been added',
      });
      setIsSubmitting(false);
      return;
    }

    addTeammate(values.email);
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Invite team members to collaborate with you.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="colleague@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </form>
      </Form>

      {teammates.length > 0 && (
        <div className="space-y-2">
          <Label>Invited teammates</Label>
          <div className="space-y-2 max-h-70 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {[...teammates].reverse().map((email) => (
                <motion.div
                  key={email}
                  variants={teammateAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <span className="text-sm">{email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTeammate(email)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
