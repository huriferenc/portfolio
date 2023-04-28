import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReferenceComponent } from './reference/reference.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'reference', component: ReferenceComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      /**
       * Although the 'scrollPositionRestoration: 'enabled'' setting in AppRoutingModule restores the scroll position when the component is loaded,
       * the section that is in the same position as the section viewed on the previous page still receives the 'visible' class.
       * Therefore, it is still necessary to run the 'window.scrollTo(0, 0)' function in the OnInit event of the components. (see in the HomeComponent, ReferenceComponent)
       * The scrollPositionRestoration setting in AppRoutingModule needs to be improved.
       */
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
