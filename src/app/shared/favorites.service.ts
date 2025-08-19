import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private notificationService: NotificationsService,
    private translationService: TranslateService) { }

  addHandle(handle) {
    if (typeof(Storage) !== "undefined") {
        let favorites = this.getFavorites()
        favorites.push(handle)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }

  removeHandle(handle) {
    if (typeof(Storage) !== "undefined") {
        let favorites = this.getFavorites()
        const indexToRemove = favorites.indexOf(handle)
        if (indexToRemove !== -1) {
            favorites.splice(indexToRemove, 1)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }
  }

  removeAllHandles() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('favorites', JSON.stringify([]))
    }
  }

  isHandleInFavorites(handle) {
    let favorites = this.getFavorites()
    return favorites.includes(handle);
  }

  getFavorites() {
    if (typeof(Storage) !== "undefined") {
        return JSON.parse(localStorage.getItem('favorites')) || []
    }
    return []
  }

  getFavoritesUrl() {
    const favorites = this.getFavorites();
    const handles = favorites.filter(fav => fav.match(/^\d+\/\d+$/));
    const uris = favorites.filter(fav => !fav.match(/^\d+\/\d+$/));
  
    let handleQuery = handles.length > 0 ? `handle:(${handles.join(" OR ")})` : '';
    let uriQuery = uris.length > 0 ? `dc.identifier.uri:(${uris.join(" OR ")})` : '';
  
    let query = [handleQuery, uriQuery].filter(q => q).join(" OR ");
    let url = `/search?query=${query}&favorites=true`;
  
    return url;
  }

  copyFavoritesUrlToClipBoard() {
      if (typeof document !== "undefined") {
          const element = document.createElement('textarea')
          element.value = this.getFavoritesUrl()
          document.body.appendChild(element)
          element.select()
          document.execCommand('copy')
          document.body.removeChild(element)
      } else {
          console.warn('Unable to copy to clipboard. Document object is not available.')
      }
  }

  isEmpty(){
    return this.countElements() === 0;
  }

  isTheCurrentUrlTheFavoritesPage() {
    let isTheFavoritesPage = false;
    this.activatedRoute.queryParams.subscribe(params => {
        let date = params['favorites'];
        isTheFavoritesPage = date === "true";
    })
    return isTheFavoritesPage
  }

  countElements() {
    const favorites = this.getFavorites()
    return favorites.length
  }

  redirectToFavoritesPage() {
    if (this.countElements() > 0) {
      this.router.navigateByUrl(this.getFavoritesUrl());
    } else {
      this.notificationService.error(this.translationService.get('favorites.error.title'), this.translationService.get('favorites.error.content'));
    }
  }
}