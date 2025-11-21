import { Patient } from "../../types";


interface Props {
  patient: Patient;
}

const Entries = ({ patient }: Props) => {

  console.log(`ENTRIES: ${patient.entries.length}`);

  return (
    <>
      <h2>entries</h2>

      {patient.entries.map(entry =>
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>
                {code}
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};


export default Entries;