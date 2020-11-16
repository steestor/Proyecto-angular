import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItiCoreNgModule } from '@iti/core-ng';
import { DxButtonModule, DxDataGridModule, DxDrawerModule, DxPopupModule, DxScrollViewModule,
    DxTextBoxModule, DxTreeViewModule, DxValidationGroupModule, DxValidatorModule, DxTextAreaModule,
    DxNumberBoxModule, 
    DxCheckBoxModule,
    DxSelectBoxModule} from 'devextreme-angular';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxiItemModule, DxoSearchPanelModule } from 'devextreme-angular/ui/nested';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { I18nModule } from './services';
import { SingleCardComponent, MainLayoutComponent, HeaderComponent,
    SideNavigationMenuComponent, UserPanelComponent, PopupComponent,
    DynamicPopupComponent, FooterComponent, TextBoxComponent, PasswordBoxComponent,
    ToolbarOkCancelComponent, CardComponent, TextAreaComponent, NumberBoxComponent, CheckBoxComponent, SelectBoxComponent } from './components';

const components = [
    SingleCardComponent,
    MainLayoutComponent,
    HeaderComponent,
    SideNavigationMenuComponent,
    UserPanelComponent,
    PopupComponent,
    DynamicPopupComponent,
    FooterComponent,
    TextBoxComponent,
    PasswordBoxComponent,
    ToolbarOkCancelComponent,
    CardComponent,
    NumberBoxComponent,
    TextAreaComponent,
    CheckBoxComponent,
    SelectBoxComponent
];

const dxModules = [
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxScrollViewModule,
    DxDrawerModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxoSearchPanelModule,
    DxToolbarModule,
    DxTreeViewModule,
    DxiItemModule,
    DxListModule,
    DxContextMenuModule,
    DxPopupModule,
    DxTextAreaModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule
];

@NgModule({
    imports: [
        dxModules,
        I18nModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ItiCoreNgModule
    ],
    declarations: [
        components
    ],
    exports: [
        dxModules,
        components,
        I18nModule,
        CommonModule,
        FormsModule,
        ItiCoreNgModule
    ],
    entryComponents: [

    ]
})
export class SharedModule { }
