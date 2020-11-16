import { ItiBaseDto } from '@iti/core-ng';

export class ChangePassword extends ItiBaseDto {
    public pwdActual!: string;
    public pwdNuevo!: string;
}
