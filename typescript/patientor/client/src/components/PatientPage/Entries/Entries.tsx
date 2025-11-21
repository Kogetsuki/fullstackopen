import { Patient } from "../../../types";
import Entry from "./Entry";


interface Props {
  patient: Patient;
}

const Entries = ({ patient }: Props) => {

  return (
    <>
      <h2>entries</h2>

      {patient.entries.map(entry =>
        <Entry key={entry.id} entry={entry} />
      )}
    </>
  );
};


export default Entries;