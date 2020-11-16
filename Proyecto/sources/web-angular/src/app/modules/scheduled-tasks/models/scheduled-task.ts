import { ItiBaseIdDto } from './../../../shared/models/iti-base-id.dto';

export class ScheduledTask extends ItiBaseIdDto {
    public Name: string;
    public Identifier: string;
    public Cron: string;
    public IsActive: boolean;
    public Timeout: number;
    public IsRunning: boolean;

    public get activeIcon() {
        return this.IsActive ? 'check' : 'clear';
    }

    public defaultValues() {
        this.IsActive = true;
    }
}
