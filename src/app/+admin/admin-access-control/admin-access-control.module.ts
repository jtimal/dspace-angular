import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminAccessControlRoutingModule } from './admin-access-control-routing.module';
import { EPeopleRegistryComponent } from './epeople-registry/epeople-registry.component';
import { EPersonFormComponent } from './epeople-registry/eperson-form/eperson-form.component';
import { GroupFormComponent } from './group-registry/group-form/group-form.component';
import { MembersListComponent } from './group-registry/group-form/members-list/members-list.component';
import { SubgroupsListComponent } from './group-registry/group-form/subgroup-list/subgroups-list.component';
import { GroupsRegistryComponent } from './group-registry/groups-registry.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    AdminAccessControlRoutingModule
  ],
  declarations: [
    EPeopleRegistryComponent,
    EPersonFormComponent,
    GroupsRegistryComponent,
    GroupFormComponent,
    SubgroupsListComponent,
    MembersListComponent
  ]
})
/**
 * This module handles all components related to the access control pages
 */
export class AdminAccessControlModule {

}
