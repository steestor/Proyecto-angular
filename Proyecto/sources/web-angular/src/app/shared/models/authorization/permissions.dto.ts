
import { PermissionDto } from './permission.dto';
import { ItiBaseIdDto } from '../iti-base-id.dto';

export class PermissionsDto extends ItiBaseIdDto {
    hash: string;
    items: PermissionDto[];
}
