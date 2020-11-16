import { ItiBaseIdDto } from '../../../shared/models';

export class User extends ItiBaseIdDto {
    public UserName: string;
    public Name: string;
    public PhoneNumber: string;
    public Email: string;
    public Password: string;
    public IsActive: boolean;
    public IsAdmin: boolean;

    public get activeIconName() {
        return this.IsActive ? 'check' : 'clear';
    }

    public defaultValues() {
        this.IsActive = true;
    }
}
