import { WorkspaceDto } from '@/application/dtos/core/workspaces/WorkspaceDto';
import { UserDto } from '@/application/dtos/core/users/UserDto';

export interface UserLoggedResponse {
  user: UserDto;
  access_token: string;
  defaultWorkspace: WorkspaceDto;
}
