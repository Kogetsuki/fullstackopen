import type { Diagnosis, HospitalEntry } from "../../../types";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}


const HospitalEntry = ({ entry, diagnoses }: Props) => {
  const getDiagnosis = (code: string): Diagnosis | undefined =>
    diagnoses.find(d => d.code === code);

  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant='h6'>
          {entry.date} <LocalHospitalIcon />
        </Typography>

        <Typography>
          <i>{entry.description}</i>
        </Typography>

        <List>
          {entry.diagnosisCodes?.map(code =>
            <ListItem key={code}>
              {getDiagnosis(code)?.name}
            </ListItem>
          )}
        </List>

        <Typography>
          Discharge: {entry.discharge.date} - {entry.discharge.criteria}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default HospitalEntry;