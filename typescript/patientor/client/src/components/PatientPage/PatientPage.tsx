import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Entry, Patient } from "../../types";

import patientService from "../../services/patients";

import GenderIcon from "./GenderIcon";
import Entries from "./Entries/Entries";
import EntryForm from "./Entries/EntryForm";


const PatientPage = () => {
  const { id } = useParams<{ id: string; }>();
  const [patient, setPatient] = useState<Patient | null>(null);


  useEffect(() => {
    if (!id)
      throw new Error('Incorrect id');

    const fetchPatient = async () => {
      const fullPatient = await patientService.getPatient(id);
      setPatient(fullPatient);
    };

    void fetchPatient();
  }, [id]);


  const onAddEntry = (entry: Entry) => {
    if (!patient)
      return;

    setPatient({
      ...patient,
      entries: patient.entries.concat(entry)
    });
  };


  if (!patient)
    return <div>Loading</div>;


  return (
    <>
      <h1>
        {patient.name}{"  "}
        <GenderIcon gender={patient.gender} />
      </h1>

      <div>DOB: {patient.dateOfBirth}</div>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>

      <EntryForm patient={patient} onAddEntry={onAddEntry} />
      <Entries patient={patient} />
    </>
  );
};

export default PatientPage;