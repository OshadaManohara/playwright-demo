"use client";

import * as React from "react";
import { PatientCard } from "@/components/patient-card";
import { AddPatientModal } from "@/components/add-patient-modal";
import { H1, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingOverlay } from "@/components/ui/loader";
import { supabase } from "@/lib/supabaseClient";
import { Patient } from "@/types/patients";

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = React.useState<Patient[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching patients:", error.message);
      setPatients([]);
    } else {
      setPatients(data as Patient[]);
      setFilteredPatients(data as Patient[]);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    fetchPatients();
  }, []);

  React.useEffect(() => {
    const filtered = patients.filter((patient) => {
      const fullName = `${patient.first_name ?? ""} ${
        patient.last_name ?? ""
      }`.trim();
      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false)
      );
    });

    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleViewDetails = (patientId: string) => {
    console.log("View patient details:", patientId);
    // Navigate to a detailed page or open a modal
  };

  const handleAddPatient = () => {
    setIsAddModalOpen(true);
  };

  const handleAddPatientSubmit = async () => await fetchPatients();

  return (
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
          placeholder="Search patients by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <LoadingOverlay
          message="Loading patients..."
          size="lg"
          variant="spinner"
        />
      ) : filteredPatients.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      <AddPatientModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddPatient={handleAddPatientSubmit}
      />
    </div>
  );
}
