import { ItiBaseDto } from '@iti/core-ng';

export class ItiBaseIdDto extends ItiBaseDto {

    public Id: any;
    public Version: any;

    public isNewItem(): boolean {
        return this.Id == null ? true : false;
    }

    public toJson(omitProperties: string[] = [], resetTrackChanges: boolean = true) {
        if (omitProperties.indexOf('Id') === -1 && (this.Id === null || this.Id === undefined)) {
            omitProperties.push('Id');
        }
        return super.toJson(omitProperties, resetTrackChanges);
    }
}
