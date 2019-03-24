import { NgModule } from '@angular/core';
import { 
    MatInputModule, 
    MatExpansionModule, 
    MatCardModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatProgressSpinnerModule, 
    MatPaginatorModule, 
    MatDialogModule
} from '@angular/material';

@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class AngularMaterialModule {

}