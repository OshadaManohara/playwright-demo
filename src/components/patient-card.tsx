"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { P } from "@/components/ui/typography";

interface PatientVital {
  type: string;
  value: string;
  unit: string;
  status: "normal" | "high" | "low";
}

interface Patient {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  diseases: string[];
  recentVitals: PatientVital[];
  lastVisit: string;
  nextAppointment?: string;
}

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (patientId: string) => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getDiseaseVariant = (
  disease: string
): "danger" | "warning" | "secondary" => {
  switch (disease.toLowerCase()) {
    case "hypertension":
      return "danger";
    case "diabetes":
    case "blood glucose":
      return "warning";
    default:
      return "secondary";
  }
};

const getVitalStatusColor = (status: string) => {
  switch (status) {
    case "high":
      return "text-red-600";
    case "low":
      return "text-blue-600";
    case "normal":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

export function PatientCard({ patient, onViewDetails }: PatientCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={patient?.avatar} alt={patient.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{patient.name}</h3>
              <P className="text-sm text-muted-foreground">
                Age: {patient.age}
              </P>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(patient.id)}
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
      <CardContent className="space-y-4">
        {/* Diseases */}
        <div>
          <P className="text-sm font-medium mb-2">Conditions:</P>
          <div className="flex flex-wrap gap-1">
            {patient.diseases.map((disease, index) => (
              <Badge
                key={index}
                variant={getDiseaseVariant(disease)}
                className="text-xs"
              >
                {disease}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Vitals */}
        <div>
          <P className="text-sm font-medium mb-2">Recent Vitals:</P>
          <div className="grid grid-cols-2 gap-2">
            {patient.recentVitals.slice(0, 4).map((vital, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-muted-foreground">{vital.type}:</span>
                <span className={getVitalStatusColor(vital.status)}>
                  {vital.value} {vital.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Information */}
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-muted-foreground">Last Visit:</span>
              <span className="ml-1 font-medium">{patient.lastVisit}</span>
            </div>
            {patient.nextAppointment && (
              <div>
                <span className="text-muted-foreground">Next:</span>
                <span className="ml-1 font-medium text-primary">
                  {patient.nextAppointment}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
