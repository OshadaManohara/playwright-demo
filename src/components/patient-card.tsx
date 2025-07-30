"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";
import { Patient } from "@/types/patients";

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (patientId: string) => void;
}

const getInitials = (first: string = "", last: string = "") =>
  `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();

const calculateAge = (birthDate?: string) => {
  if (!birthDate) return undefined;
  const dob = new Date(birthDate);
  const ageDiff = Date.now() - dob.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export function PatientCard({ patient, onViewDetails }: PatientCardProps) {
  const fullName = `${patient.first_name ?? ""} ${
    patient.last_name ?? ""
  }`.trim();
  const age = calculateAge(patient.birth_date);

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(patient.first_name, patient.last_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <H3 className="font-semibold text-lg">{fullName}</H3>
              {age !== undefined && (
                <P className="text-sm text-muted-foreground m-0">Age: {age}</P>
              )}
              {patient.email && (
                <P className="text-xs text-muted-foreground">{patient.email}</P>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(String(patient.id))}
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mt-2 text-sm">
        {patient.gender && (
          <P data-testid="patient-gender">
            <strong>Gender:</strong> {patient.gender}
          </P>
        )}
        {patient.phone && (
          <P data-testid="patient-phone">
            <strong>Phone:</strong> {patient.phone}
          </P>
        )}
        {patient.address_city && (
          <P data-testid="patient-city">
            <strong>City:</strong> {patient.address_city}
          </P>
        )}
      </CardContent>
    </Card>
  );
}
