import { useEffect, useState } from "react";

import { Diagnosis, Patient } from "../../../types";
import diagnoseService from '../../../services/diagnoses';

import Entry from "./Entry";


interface Props {
  patient: Patient;
}

const Entries = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);


  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);


  return (
    <>
      <h2>entries</h2>

      {patient.entries.map(entry =>
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      )}
    </>
  );
};


export default Entries;