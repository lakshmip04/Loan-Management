import { useContext } from 'react';
import { UserContext } from '../App';

export function usePermissions() {
  const { role, canEdit } = useContext(UserContext);

  return {
    canEdit,
    isManager: role === 'Manager',
    isStaff: role === 'Staff',
    canApproveLoan: role === 'Manager',
    canViewDetails: true, // Both roles can view details
  };
} 