import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/features/auth/';
import { profileService } from '@/features/profile/api/profile.service';
import { logger } from '@/utils/logger';
import { NotFoundError } from '@/utils/errors';
import { useToast } from '@/components/ui/toast-hook';
import type { Profile } from '../types/profile.types';

export function useProfile(): UseQueryResult<Profile | null> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();
  const validAuth: boolean = auth?.userId !== null && auth?.token !== null;

  const profileQuery = useQuery({
    queryKey: ['profile', auth?.userId, auth?.token],
    queryFn: () =>
      profileService.fetchProfileByUserId({
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      }),
    retry: false,
    enabled: validAuth,
  });

  const navigate = useNavigate();

  useEffect(() => {
    function processErrors(): void {
      if (profileQuery.error) {
        logger.logError(profileQuery.error);

        if (profileQuery.error instanceof NotFoundError) {
          navigate('/profile/form');
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Unable to fetch profile',
          });
        }
      }
    }

    processErrors();
  }, [navigate, profileQuery.error, toast]);

  return profileQuery;
}
