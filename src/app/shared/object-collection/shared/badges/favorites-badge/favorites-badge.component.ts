import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DSpaceObject } from '../../../../../core/shared/dspace-object.model';
import { FavoritesService } from '../../../../favorites.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'ds-favorites-badge',
  styleUrls: ['./favorites-badge.component.scss'],
  templateUrl: './favorites-badge.component.html',
  standalone: true,
  imports: [NgIf, TranslateModule, CommonModule],
})
/**
 * Component rendering the badge to add/remove an item from the favorites list
 */
export class FavoritesBadgeComponent implements OnInit {

  /**
   * The component used to retrieve the uri from
   */
  @Input() object: DSpaceObject;

  constructor(private favoritesService: FavoritesService, private router: Router, private notificationService: NotificationsService, private translationService: TranslateService) {}

  ngOnInit(): void {
    this.favoritesService = new FavoritesService(null, this.router, this.notificationService, this.translationService);
  }

  getHandleFromUrl(url: string): string | undefined {
    const urlParts = url?.split('/') ?? [];
    if (urlParts.length < 3) {
      return undefined;
    }

    const prefix = urlParts[urlParts.length - 2];
    const sufix = urlParts[urlParts.length - 1];

    return `${prefix}/${sufix}`;
  }

  onSaveItem(url): void {
    return this.favoritesService.addHandle(this.getHandleFromUrl(url))
  }

  onRemoveItem(url): void {
    return this.favoritesService.removeHandle(this.getHandleFromUrl(url))
  }

  isInFavorites(url) {
    return this.favoritesService.isHandleInFavorites(this.getHandleFromUrl(url))
  }
}
