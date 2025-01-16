import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      onClick={() => navigate('/')}
      className="flex items-center gap-2 text-base font-medium"
      size="lg"
    >
      <ArrowLeft className="h-5 w-5" />
      Retour à l'accueil
    </Button>
  );
};

export default BackButton;