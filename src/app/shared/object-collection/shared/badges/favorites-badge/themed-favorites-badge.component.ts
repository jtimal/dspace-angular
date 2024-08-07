import {
    Component,
    Input,
  } from '@angular/core';
  
  import { DSpaceObject } from '../../../../../core/shared/dspace-object.model';
  import { ThemedComponent } from '../../../../theme-support/themed.component';
  import { FavoritesBadgeComponent } from './favorites-badge.component';
  
  /**
   * Themed wrapper for FavoritesBadgeComponent
   */
  @Component({
    selector: 'ds-favorites-badge',
    styleUrls: [],
    templateUrl: '../../../../theme-support/themed.component.html',
    standalone: true,
    imports: [FavoritesBadgeComponent],
  })
  export class ThemedFavoritesBadgeComponent extends ThemedComponent<FavoritesBadgeComponent> {
    @Input() object: DSpaceObject;
  
    protected inAndOutputNames: (keyof FavoritesBadgeComponent & keyof this)[] = ['object'];
  
    protected getComponentName(): string {
      return 'FavoritesBadgeComponent';
    }
  
    protected importThemedComponent(themeName: string): Promise<any> {
      return import(`../../../../../../themes/${themeName}/app/shared/object-collection/shared/badges/status-badge/status-badge.component`);
    }
  
    protected importUnthemedComponent(): Promise<any> {
      return import(`./favorites-badge.component`);
    }
  }
  