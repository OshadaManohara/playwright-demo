"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PatientCard } from "@/components/patient-card";
import { H1, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample patient data
const samplePatients = [
  {
    id: "1",
    name: "John Smith",
    age: 65,
    avatar: "",
    diseases: ["Hypertension", "Diabetes"],
    recentVitals: [
      {
        type: "Blood Pressure",
        value: "140/90",
        unit: "mmHg",
        status: "high" as const,
      },
      {
        type: "Blood Sugar",
        value: "180",
        unit: "mg/dL",
        status: "high" as const,
      },
      {
        type: "Heart Rate",
        value: "78",
        unit: "bpm",
        status: "normal" as const,
      },
      {
        type: "Temperature",
        value: "98.6",
        unit: "°F",
        status: "normal" as const,
      },
    ],
    lastVisit: "2025-01-15",
    nextAppointment: "2025-02-15",
  },
  {
    id: "2",
    name: "Maria Garcia",
    age: 45,
    avatar: "",
    diseases: ["Hypertension"],
    recentVitals: [
      {
        type: "Blood Pressure",
        value: "135/85",
        unit: "mmHg",
        status: "high" as const,
      },
      {
        type: "Heart Rate",
        value: "72",
        unit: "bpm",
        status: "normal" as const,
      },
      { type: "Weight", value: "145", unit: "lbs", status: "normal" as const },
      {
        type: "Temperature",
        value: "98.4",
        unit: "°F",
        status: "normal" as const,
      },
    ],
    lastVisit: "2025-01-20",
    nextAppointment: "2025-02-20",
  },
  {
    id: "3",
    name: "David Johnson",
    age: 58,
    avatar: "",
    diseases: ["Diabetes", "High Cholesterol"],
    recentVitals: [
      {
        type: "Blood Sugar",
        value: "165",
        unit: "mg/dL",
        status: "high" as const,
      },
      {
        type: "Blood Pressure",
        value: "120/80",
        unit: "mmHg",
        status: "normal" as const,
      },
      {
        type: "Cholesterol",
        value: "240",
        unit: "mg/dL",
        status: "high" as const,
      },
      {
        type: "Heart Rate",
        value: "68",
        unit: "bpm",
        status: "normal" as const,
      },
    ],
    lastVisit: "2025-01-18",
    nextAppointment: "2025-02-18",
  },
  {
    id: "4",
    name: "Sarah Williams",
    age: 52,
    avatar: "",
    diseases: ["Hypertension", "Diabetes"],
    recentVitals: [
      {
        type: "Blood Pressure",
        value: "145/95",
        unit: "mmHg",
        status: "high" as const,
      },
      {
        type: "Blood Sugar",
        value: "195",
        unit: "mg/dL",
        status: "high" as const,
      },
      {
        type: "Heart Rate",
        value: "85",
        unit: "bpm",
        status: "normal" as const,
      },
      { type: "Weight", value: "160", unit: "lbs", status: "normal" as const },
    ],
    lastVisit: "2025-01-22",
    nextAppointment: "2025-02-22",
  },
  {
    id: "5",
    name: "Robert Brown",
    age: 48,
    avatar: "",
    diseases: ["Diabetes"],
    recentVitals: [
      {
        type: "Blood Sugar",
        value: "155",
        unit: "mg/dL",
        status: "high" as const,
      },
      {
        type: "Blood Pressure",
        value: "118/75",
        unit: "mmHg",
        status: "normal" as const,
      },
      {
        type: "Heart Rate",
        value: "70",
        unit: "bpm",
        status: "normal" as const,
      },
      {
        type: "Temperature",
        value: "98.7",
        unit: "°F",
        status: "normal" as const,
      },
    ],
    lastVisit: "2025-01-25",
    nextAppointment: "2025-02-25",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    age: 39,
    avatar: "",
    diseases: ["High Cholesterol"],
    recentVitals: [
      {
        type: "Cholesterol",
        value: "220",
        unit: "mg/dL",
        status: "high" as const,
      },
      {
        type: "Blood Pressure",
        value: "115/70",
        unit: "mmHg",
        status: "normal" as const,
      },
      {
        type: "Heart Rate",
        value: "65",
        unit: "bpm",
        status: "normal" as const,
      },
      { type: "Weight", value: "135", unit: "lbs", status: "normal" as const },
    ],
    lastVisit: "2025-01-28",
    nextAppointment: "2025-02-28",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredPatients, setFilteredPatients] =
    React.useState(samplePatients);

  React.useEffect(() => {
    const filtered = samplePatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.diseases.some((disease) =>
          disease.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredPatients(filtered);
  }, [searchTerm]);

  const handleViewDetails = (patientId: string) => {
    console.log("View patient details:", patientId);
    // Here you would navigate to patient details page
    // For now, just log the action
  };

  const handleAddPatient = () => {
    console.log("Add new patient");
    // Here you would open add patient modal or navigate to add patient page
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <H1>Patients</H1>
            <P className="text-muted-foreground">
              Manage and monitor your patients&apos; health information
            </P>
          </div>
          <Button onClick={handleAddPatient}>
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Patient
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search patients by name or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <H1 className="mt-4 text-xl text-gray-500">No patients found</H1>
            <P className="text-gray-400">Try adjusting your search criteria</P>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
