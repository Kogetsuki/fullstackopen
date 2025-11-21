import type { Entry } from "../../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";


interface Props {
  entry: Entry;
}

const Entry = ({ entry }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type ${JSON.stringify(value)}`);
  };


  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;

    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
};


export default Entry;