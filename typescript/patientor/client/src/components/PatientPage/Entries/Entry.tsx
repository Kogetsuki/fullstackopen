import type { Diagnosis, Entry } from "../../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";


interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const Entry = ({ entry, diagnoses }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type ${JSON.stringify(value)}`);
  };


  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;

    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;

    default:
      return assertNever(entry);
  }
};


export default Entry;