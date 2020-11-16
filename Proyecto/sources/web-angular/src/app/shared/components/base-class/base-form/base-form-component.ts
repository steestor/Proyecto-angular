import { OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export abstract class BaseFormComponent implements OnInit {

    protected route: ActivatedRoute;
    protected router: Router;

    get isEditing() {
        return !this.isAdding;
    }

    get isAdding() {
        // Al editar se le pasa la clave primaria del elemento a editar como parámetro de ruta
        // por lo que si no tiene parámetro de ruta el formulario se asume que está en './nuevo'
        return JSON.stringify(this.route.snapshot.params) === '{}';
    }

    constructor(protected injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
    }

    ngOnInit() {
        this.route.params.subscribe(this.getParam.bind(this));
    }

    getParam(params: Params) {
        // Método que redifinirán las clases hijas para recibir los parámetros
    }

    cancel() {
        this.routeToList();
    }

    routeToList() {
        const routeTo = this.isEditing ? './../..' : './..';
        this.router.navigate([routeTo], { relativeTo: this.route });
    }

}
