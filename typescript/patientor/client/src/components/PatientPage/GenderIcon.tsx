import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from '../../types';


interface Props {
  gender: Patient["gender"];
}


const GenderIcon = ({ gender }: Props) => {
  const size = 'large';

  switch (gender) {
    case 'male':
      return <MaleIcon fontSize={size} />;

    case 'female':
      return <FemaleIcon fontSize={size} />;

    case 'other':
      return <TransgenderIcon fontSize={size} />;

    default:
      throw new Error('Incorrect gender value');
  }
};


export default GenderIcon;