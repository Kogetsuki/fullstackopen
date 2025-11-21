import type { Diagnosis, HealthCheckEntry } from "../../../types";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';


interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}


const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  const getDiagnosis = (code: string): Diagnosis | undefined =>
    diagnoses.find(d => d.code === code);


  const ratingColor = (): string => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';

      case 1:
        return 'yellow';

      case 2:
        return 'orange';

      case 3:
        return 'red';

      default:
        throw new Error(`Incorrect HealthChekRating ${JSON.stringify(entry.healthCheckRating)}`);
    }
  };


  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant='h6'>
          {entry.date} <MedicalServicesIcon />
        </Typography>

        <Typography>
          <i>{entry.description}</i>
        </Typography>

        <FavoriteIcon htmlColor={ratingColor()} />

        <List>
          {entry.diagnosisCodes?.map(code =>
            <ListItem key={code}>
              {getDiagnosis(code)?.name}
            </ListItem>
          )}
        </List>

        <Typography>
          Diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default HealthCheckEntry; 