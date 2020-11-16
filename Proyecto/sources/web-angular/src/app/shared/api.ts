import { environment } from './../../environments/environment';

//
// Rutas a los endpoints del API
//

export class Api {

    public static apiUrl = environment.apiUrl;

    public static login = `${Api.apiUrl}login`;

    public static backgroundTasks = `${Api.apiUrl}BackgroundTasks`;

    public static scheduledTasks = `${Api.apiUrl}ScheduledTasks`;
    public static scheduledTaskId = `${Api.scheduledTasks}/{0}`;
    public static scheduledTaskIdStart = `${Api.scheduledTaskId}/Start`;
    public static scheduledTaskIdStop = `${Api.scheduledTaskId}/Stop`;

}
