"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";

const addPatientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: z.string().min(1, "Birth date is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address_line_1: z.string().min(1, "Address line 1 is required"),
  address_line_2: z.string().optional(),
  address_city: z.string().min(1, "City is required"),
  zipcode: z.string().min(4, "ZIP code is required"),
  gender: z.string().min(1, "Gender is required"),
});

type AddPatientForm = z.infer<typeof addPatientSchema>;

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPatient: (patient: AddPatientForm) => void;
}

const genders = ["Male", "Female", "Other"];

export function AddPatientModal({
  open,
  onOpenChange,
  onAddPatient,
}: AddPatientModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddPatientForm>({
    resolver: zodResolver(addPatientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: "",
      email: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      address_city: "",
      zipcode: "",
      gender: "",
    },
  });

  const watchedGender = watch("gender");

  const onSubmit = async (data: AddPatientForm) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("patients").insert([
        {
          uuid: (await supabase.auth.getUser()).data.user?.id,
          first_name: data.first_name,
          last_name: data.last_name,
          birth_date: data.birth_date,
          email: data.email,
          phone: data.phone,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          address_city: data.address_city,
          zipcode: data.zipcode,
          gender: data.gender,
          is_active: true,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error.message);
        alert("Failed to add patient. Please try again.");
        return;
      }

      onAddPatient(data);

      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input id="first_name" {...register("first_name")} />
              {errors.first_name && (
                <p className="text-sm text-destructive">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input id="last_name" {...register("last_name")} />
              {errors.last_name && (
                <p className="text-sm text-destructive">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth_da">Birth Date *</Label>
              <Input id="birth_da" type="date" {...register("birth_date")} />
              {errors.birth_date && (
                <p className="text-sm text-destructive">
                  {errors.birth_date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line_1">Address Line 1 *</Label>
              <Input
                id="address_line_1"
                {...register("address_line_1")}
                placeholder="123 Main St"
              />
              {errors.address_line_1 && (
                <p className="text-sm text-destructive">
                  {errors.address_line_1.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adress_line_2">Address Line 2</Label>
              <Input
                id="adress_line_2"
                {...register("address_line_2")}
                placeholder="Apartment or Suite #"
              />
              {errors.address_line_2 && (
                <p className="text-sm text-destructive">
                  {errors.address_line_2.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_city">City *</Label>
              <Input
                id="address_city"
                {...register("address_city")}
                placeholder="Colombo"
              />
              {errors.address_city && (
                <p className="text-sm text-destructive">
                  {errors.address_city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipcode">ZIP Code *</Label>
              <Input id="zipcode" {...register("zipcode")} />
              {errors.zipcode && (
                <p className="text-sm text-destructive">
                  {errors.zipcode.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select
                value={watchedGender}
                onValueChange={(value) => setValue("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding Patient..." : "Add Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
