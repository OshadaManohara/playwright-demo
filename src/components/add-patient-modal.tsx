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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const addPatientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthDate: z.string().min(1, "Birth date is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  healthPlan: z.string().min(1, "Health plan is required"),
  medicalNotes: z.string().optional(),
  rpmDevice: z.string().min(1, "RPM device is required"),
});

type AddPatientForm = z.infer<typeof addPatientSchema>;

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPatient: (patient: AddPatientForm) => void;
}

const healthPlans = [
  "Medicare",
  "Medicaid",
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Humana",
  "Kaiser Permanente",
  "Anthem",
  "Self-Pay",
];

const rpmDevices = [
  "Blood Pressure Monitor - Model BP-2000",
  "Glucose Monitor - Model GM-150",
  "Heart Rate Monitor - Model HR-300",
  "Weight Scale - Model WS-400",
  "Pulse Oximeter - Model PO-250",
  "Temperature Monitor - Model TM-100",
  "Activity Tracker - Model AT-500",
  "Sleep Monitor - Model SM-350",
];

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
      name: "",
      birthDate: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      healthPlan: "",
      medicalNotes: "",
      rpmDevice: "",
    },
  });

  const watchedHealthPlan = watch("healthPlan");
  const watchedRpmDevice = watch("rpmDevice");

  const onSubmit = async (data: AddPatientForm) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onAddPatient(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding patient:", error);
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
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter patient's full name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date *</Label>
              <Input id="birthDate" type="date" {...register("birthDate")} />
              {errors.birthDate && (
                <p className="text-sm text-destructive">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="patient@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="123 Main St, City, State"
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* ZIP Code */}
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                {...register("zipCode")}
                placeholder="12345"
              />
              {errors.zipCode && (
                <p className="text-sm text-destructive">
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            {/* Health Plan */}
            <div className="space-y-2">
              <Label>Health Plan *</Label>
              <Select
                value={watchedHealthPlan}
                onValueChange={(value) => setValue("healthPlan", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select health plan" />
                </SelectTrigger>
                <SelectContent>
                  {healthPlans.map((plan) => (
                    <SelectItem key={plan} value={plan}>
                      {plan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.healthPlan && (
                <p className="text-sm text-destructive">
                  {errors.healthPlan.message}
                </p>
              )}
            </div>

            {/* RPM Device */}
            <div className="space-y-2 md:col-span-2">
              <Label>RPM Device *</Label>
              <Select
                value={watchedRpmDevice}
                onValueChange={(value) => setValue("rpmDevice", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select RPM device" />
                </SelectTrigger>
                <SelectContent>
                  {rpmDevices.map((device) => (
                    <SelectItem key={device} value={device}>
                      {device}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.rpmDevice && (
                <p className="text-sm text-destructive">
                  {errors.rpmDevice.message}
                </p>
              )}
            </div>

            {/* Medical Notes */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="medicalNotes">Medical Notes</Label>
              <Textarea
                id="medicalNotes"
                {...register("medicalNotes")}
                placeholder="Enter any relevant medical notes or conditions..."
                rows={4}
              />
              {errors.medicalNotes && (
                <p className="text-sm text-destructive">
                  {errors.medicalNotes.message}
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
