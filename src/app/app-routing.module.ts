import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core/src/metadata/ng_module';
import {CribtoolInputComponent} from './cribtool-input/cribtool-input.component';
import {CribtoolAttackComponent} from './cribtool-attack/cribtool-attack.component';

const appRoutes: Routes = [
  {path:'', redirectTo:'/input', pathMatch:'full'},
  {path: 'input', component: CribtoolInputComponent},
  {path: 'crib', component: CribtoolAttackComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
